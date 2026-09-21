import { formatCurrency } from '@/utils/format';

export const AIEngine = {
  findCars(query, cars) {
    const q = query.toLowerCase();
    let reasoning = [];
    let filtered = [...cars];

    const peopleMatch = q.match(/(\d+)\s*(people|passengers|persons|pax|adults|kids|children)/);
    const people = peopleMatch ? parseInt(peopleMatch[1]) : null;
    if (people) {
      filtered = filtered.filter((c) => c.seats >= people);
      reasoning.push(`need seating for ${people}`);
    }

    if (/luggage|suitcase|bags|baggage|airport/.test(q)) {
      reasoning.push('need ample luggage space');
      filtered = filtered.filter((c) => parseInt(c.specifications.bootSpace) >= 400);
    }

    const budgetMatch = q.match(/(?:under|below|within|max|budget of|less than)\s*[₹rs.]*\s*(\d{3,6})/i);
    if (budgetMatch) {
      const budget = parseInt(budgetMatch[1]);
      filtered = filtered.filter((c) => c.pricePerDay <= budget);
      reasoning.push(`budget under ₹${budget}/day`);
    }

    if (/mountain|hill|off.?road|trek|adventure|snow/.test(q)) {
      filtered = filtered.filter((c) => /SUV|Luxury/.test(c.category));
      reasoning.push('need a capable SUV for terrain');
    }
    if (/city|commute|daily|work|office|errand/.test(q)) {
      filtered = filtered.filter((c) => c.pricePerDay <= 5000);
      reasoning.push('need an efficient city car');
    }
    if (/highway|road.?trip|long.?drive|tour|vacation|holiday/.test(q)) {
      filtered = filtered.filter((c) => c.seats >= 5);
      reasoning.push('need a comfortable highway cruiser');
    }
    if (/luxury|premium|wedding|special|vip|business|executive/.test(q)) {
      filtered = filtered.filter((c) => c.category === 'Luxury');
      reasoning.push('want a premium experience');
    }
    if (/electric|ev|eco|green|zero.?emission/.test(q)) {
      filtered = filtered.filter((c) => c.fuelType === 'Electric');
      reasoning.push('prefer an electric vehicle');
    }
    if (/diesel|mileage|fuel.?efficient|economy/.test(q)) {
      filtered = filtered.filter((c) => /Diesel|Hybrid|Electric/.test(c.fuelType));
      reasoning.push('want fuel efficiency');
    }
    if (/automatic|auto/.test(q)) {
      filtered = filtered.filter((c) => c.transmission === 'Automatic');
      reasoning.push('prefer automatic transmission');
    }
    if (/manual/.test(q)) {
      filtered = filtered.filter((c) => c.transmission === 'Manual');
      reasoning.push('prefer manual transmission');
    }

    if (filtered.length === 0) {
      filtered = [...cars].sort((a, b) => b.popularity - a.popularity);
      reasoning = ['could not find exact matches, showing top picks'];
    }

    filtered.sort((a, b) => b.popularity - a.popularity);
    const recommended = filtered.slice(0, 3);

    const reasonText = reasoning.length
      ? `Based on your trip, you ${reasoning.join(', ')}. Here are my top ${recommended.length} picks:`
      : `Here are the top ${recommended.length} cars I recommend for your trip:`;

    return { cars: recommended, reasonText, totalMatches: filtered.length };
  },

  planTrip(destination, days, interests) {
    const dest = destination || 'your destination';
    const d = Math.max(1, Math.min(days || 3, 7));
    const interestList = interests && interests.length
      ? interests
      : ['sightseeing', 'local cuisine', 'photography'];

    const templates = [
      { title: `Arrival & Check-in at ${dest}`, desc: `Pick up your CarFashion vehicle at the airport, drive to your hotel, and take a relaxed evening stroll through the local market.` },
      { title: `Explore ${dest} Highlights`, desc: `Morning visit to the top landmarks. Afternoon ${interestList[0]} experience. Evening sunset drive along scenic routes.` },
      { title: `Day Trip Adventure`, desc: `Drive out to nearby attractions. Perfect day for ${interestList[1] || 'an adventure activity'}. Stop for local cuisine on the way back.` },
      { title: `Culture & Food Day`, desc: `Museums, heritage sites, and a food tour through ${dest}'s best local spots. End the day with ${interestList[2] || 'a rooftop dinner'}.` },
      { title: `Nature & Relaxation`, desc: `Head to the nearest park, lake, or beach. Pack a picnic. Ideal for ${interestList[0]}.` },
      { title: `Shopping & Leisure`, desc: `Browse local boutiques and malls. Relaxed lunch, then a scenic drive to a viewpoint.` },
      { title: `Departure Day`, desc: `Return your CarFashion car at the drop-off point. Last-minute souvenir shopping before your flight.` },
    ];

    const itinerary = [];
    for (let i = 0; i < d; i++) {
      itinerary.push({ day: i + 1, ...templates[i % templates.length] });
    }
    return itinerary;
  },

  checkFit(car, passengers, largeBags, smallBags) {
    const boot = parseInt(car.specifications.bootSpace) || 400;
    const seats = car.seats;
    const passengerSpace = seats - passengers;
    const neededVolume = largeBags * 70 + smallBags * 40;
    const availableVolume = boot + Math.max(0, passengerSpace) * 80;
    const fits = availableVolume >= neededVolume;
    const tight = !fits && availableVolume >= neededVolume * 0.85;

    let message;
    if (fits) {
      message = `✓ Fits comfortably. ${car.name} has ${boot}L boot space and ${seats} seats — enough for ${passengers} passenger(s) + ${largeBags} large bag(s) + ${smallBags} small bag(s).`;
    } else if (tight) {
      message = `⚠ Tight fit. ${car.name} has ${boot}L boot and ${seats} seats. You may need to fold a seat or pack light.`;
    } else {
      message = `✗ Doesn't fit. ${car.name} has only ${boot}L boot space. Consider a larger SUV like Toyota Fortuner or Mahindra XUV700.`;
    }
    return { fits, tight, message, availableVolume, neededVolume };
  },

  calculateCost(car, distanceKm, fuelPrice, days) {
    const mileageStr = car.specifications.mileage || '15 kmpl';
    const mileageMatch = mileageStr.match(/(\d+(?:\.\d+)?)/);
    const mileage = mileageMatch ? parseFloat(mileageMatch[1]) : 15;
    let fuelCost = 0;
    let fuelLitres = 0;
    if (car.fuelType === 'Electric') {
      const kwh = distanceKm * 0.15;
      fuelCost = kwh * 8;
      fuelLitres = kwh;
    } else {
      fuelLitres = distanceKm / mileage;
      fuelCost = fuelLitres * (fuelPrice || 100);
    }
    const rentalCost = car.pricePerDay * (days || 1);
    const total = rentalCost + fuelCost;
    return { fuelCost, fuelLitres, rentalCost, total, mileage };
  },

  assistantReply(message, context) {
    const m = message.toLowerCase();
    const { cars } = context;

    if (/hi|hello|hey|namaste/.test(m)) return "Hi! I'm CarFashion AI, your rental assistant. I can help you find cars, plan trips, estimate costs, or check availability. What are you looking for today?";
    if (/cheap|budget|affordable|low.?cost/.test(m)) {
      const cheapest = [...cars].sort((a, b) => a.pricePerDay - b.pricePerDay)[0];
      return `The most affordable option is the ${cheapest.name} at ${formatCurrency(cheapest.pricePerDay)}/day. It's a ${cheapest.category} with ${cheapest.seats} seats and ${cheapest.fuelType} fuel.`;
    }
    if (/luxury|premium|best|top/.test(m)) {
      const top = [...cars].filter((c) => c.category === 'Luxury').sort((a, b) => b.rating - a.rating)[0];
      return `For a premium experience, I recommend the ${top.name} — rated ${top.rating}⭐ at ${formatCurrency(top.pricePerDay)}/day.`;
    }
    if (/electric|ev|green|eco/.test(m)) {
      const evs = cars.filter((c) => c.fuelType === 'Electric');
      return `We have ${evs.length} electric vehicles: ${evs.map((c) => c.name).join(', ')}.`;
    }
    if (/suv|7.?seat|family|big/.test(m)) {
      const suvs = cars.filter((c) => c.seats >= 7);
      return `For a larger group, I suggest: ${suvs.map((c) => c.name + ' (' + c.seats + ' seats)').join(', ')}.`;
    }
    if (/book|reserve|rent/.test(m)) return `To book: browse our Cars page, pick your favorite, and click "Book". You'll receive a QR code and digital agreement instantly.`;
    if (/cancel|refund/.test(m)) return `Our cancellation policy: free cancellation up to 24 hours before pickup.`;
    if (/price|cost|how much|rate/.test(m)) {
      const avg = Math.round(cars.reduce((s, c) => s + c.pricePerDay, 0) / cars.length);
      return `Our daily rates range from ${formatCurrency(Math.min(...cars.map((c) => c.pricePerDay)))} to ${formatCurrency(Math.max(...cars.map((c) => c.pricePerDay)))}. Average is around ${formatCurrency(avg)}/day.`;
    }
    if (/trip|plan|itinerary|days/.test(m)) return `I'd love to help plan your trip! Tell me your destination and how many days, and I'll create a day-by-day itinerary.`;
    if (/luggage|bag|suitcase/.test(m)) return `Use our Luggage & Passenger Fit Checker on any car detail page!`;
    if (/location|where|map|bhopal/.test(m)) return `We're based in Bhopal, Madhya Pradesh. Our interactive pickup map shows all our locations.`;
    if (/thank|thanks|great|awesome/.test(m)) return `You're welcome! Drive safe and enjoy your journey with CarFashion. 🚗✨`;
    return `I can help with: finding cars (try "cheap SUV for 5 people"), trip planning, cost estimates, luggage fit, bookings, and cancellations. What would you like to know?`;
  },
};