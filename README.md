# CarFashion — AI-Powered Premium Car Rentals

A modern, production-ready React application for premium car rentals with AI-powered features.

![CarFashion](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwindcss)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)

## ✨ Features

### 🤖 AI-Powered
- **AI "Find My Car"** — Natural language search
- **AI Rental Assistant** — 24/7 chat support
- **AI Trip Planner** — Day-by-day itineraries
- **Luggage Fit Checker** — Bag & passenger analysis
- **Cost Calculator** — Fuel + rental estimates
- **Smart Availability** — Best-price day highlighting

### 🚗 Core Features
- 15+ premium cars (Luxury, SUV, Sedan, Electric)
- Advanced filtering & sorting
- Compare up to 3 cars side-by-side
- Favorites (persisted to localStorage)
- 360° car gallery
- Color selector
- Availability calendar
- Digital rental agreement with signature pad
- QR code booking confirmation
- Rental Passport loyalty program
- Dark / Light theme

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/
│   ├── common/       # Navbar, Footer, Toasts, etc.
│   ├── cars/         # CarCard, Filters, Gallery, etc.
│   ├── home/         # Hero, SearchWidget, AI features
│   ├── booking/      # Form, Summary, QR, Signature
│   ├── dashboard/    # Passport, Stats, History
│   └── ai/           # AI Assistant chat
├── context/          # Global state (AppContext)
├── data/             # Static data (cars, locations)
├── hooks/            # Custom React hooks
├── pages/            # Route pages
├── services/         # AI engine
└── utils/            # Helpers (format, storage)
\`\`\`

## 🛠️ Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool
- **React Router 6** — Routing
- **Tailwind CSS 3** — Utility styling
- **Bootstrap 5** — Grid & components
- **Lucide React** — Icons
- **QRCode** — Booking QR generation

## 🎨 Theming

All colors are defined as CSS variables in `src/index.css` and referenced via Tailwind config.
Toggle dark mode via the sun/moon icon in the navbar.

## 📝 License

MIT © CarFashion
