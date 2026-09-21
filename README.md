<div align="center">

<img src="./public/favicon.svg" alt="CarFashion Logo" width="80" height="80" />

# 🚗 CarFashion

### Drive Beyond Ordinary

**AI-powered premium car rental platform built with React, Vite & Tailwind CSS**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React_Router-6.26-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://carfashion-orpin.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](./LICENSE)

### 🚀 [**View Live Demo → carfashion-orpin.vercel.app**](https://carfashion-orpin.vercel.app)



</div>

---

## 📖 About

**CarFashion** is a modern, production-ready car rental web application that combines a curated fleet of premium vehicles with AI-powered intelligence. From natural-language car search to digital rental agreements and QR-code check-ins, every interaction is designed to feel effortless.

Whether you're planning a weekend getaway, a corporate trip, or a wedding-day luxury ride, CarFashion helps you find the perfect car in seconds — not hours.

> 🎓 **Note:** This is a demo project. Authentication, bookings, and reviews are stored locally in your browser via `localStorage`.

---

## 🌐 Live Demo

### 🚀 **[carfashion-orpin.vercel.app](https://carfashion-orpin.vercel.app)**

Deployed on [Vercel](https://vercel.com) with automatic deployments on every push to `main`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/saniya784/Carfashion)

---

## ✨ Features

### 🤖 AI-Powered Intelligence

| Feature | Description |
|---|---|
| **AI "Find My Car"** | Describe your trip in plain English — the AI matches the perfect car from the fleet |
| **AI Rental Assistant** | 24/7 floating chat that answers pricing, booking, and policy questions |
| **AI Trip Planner** | Generates day-by-day itineraries for your destination and interests |
| **Luggage Fit Checker** | Analyses passenger count + bag sizes to confirm whether everything fits |
| **Trip Cost Calculator** | Estimates fuel + rental cost based on distance, days, and fuel price |
| **Smart Availability Calendar** | Highlights best-price days alongside available/unavailable dates |

### 🚗 Core Rental Experience

- **30+ premium vehicles** — Luxury, SUV, Sedan, Hatchback, Electric
- **Advanced filtering** — Filter by price, brand, fuel, transmission, category
- **Side-by-side comparison** — Compare up to 3 cars at once
- **Favorites** — Save cars with a heart, persisted across sessions
- **360° gallery** — Drag to rotate, plus fullscreen viewer
- **Car color selector** — Preview available color options
- **Detailed specs & features** — Engine, horsepower, mileage, boot space

### 🔐 Authentication & Profile

- **Sign Up / Login** — Modal-based auth with validation
- **Password hashing** — Passwords are hashed before storage (demo)
- **Profile page** — Edit name & phone, view lifetime stats
- **Auto-generated avatars** — Gradient initials derived from your name
- **Session persistence** — Stay logged in across page reloads

### ⭐ Ratings & Reviews

- **5-star rating system** — Hover preview with descriptive labels (Poor → Excellent)
- **Written reviews** — One review per user per car
- **Average rating** — Auto-computed from real user reviews
- **Distribution chart** — Breakdown of 5★ / 4★ / 3★ / 2★ / 1★
- **Helpful button** — Community upvote on reviews
- **Time-ago formatting** — "just now", "2h ago", "3d ago"

### 🎨 Premium UX

- **Dark / Light mode** — Persisted theme toggle
- **Rental Passport** — Loyalty program tracking trips, km, points, savings
- **Booking QR code** — Generated instantly on confirmation
- **Digital rental agreement** — Sign with mouse or finger (canvas signature pad)
- **Animated stats** — Count-up numbers when scrolled into view
- **Toast notifications** — Non-intrusive feedback for every action
- **Fully responsive** — Mobile-first design with hamburger drawer

---


## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **[React 18](https://react.dev)** | Component-based UI library |
| **[Vite 5](https://vitejs.dev)** | Lightning-fast build tool & dev server |
| **[React Router 6](https://reactrouter.com)** | Client-side routing |
| **[Tailwind CSS 3](https://tailwindcss.com)** | Utility-first styling |
| **[Bootstrap 5](https://getbootstrap.com)** | Grid & base components |
| **[Lucide React](https://lucide.dev)** | Beautiful, consistent icons |

### Utilities

| Package | Purpose |
|---|---|
| **[qrcode](https://www.npmjs.com/package/qrcode)** | Generate booking QR codes |
| **Context API** | Global state (auth, favorites, bookings, theme) |
| **localStorage** | Client-side persistence layer |

### Deployment

| Service | Purpose |
|---|---|
| **[Vercel](https://vercel.com)** | Hosting + CDN + auto-deploy |

---

## 🚀 Installation

### Prerequisites

- **Node.js** ≥ 18.0
- **npm** ≥ 9.0 (or pnpm / yarn)

### 1. Clone the repository

```bash
git clone https://github.com/saniya784/Carfashion.git
cd Carfashion
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Build optimized production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all `.js` / `.jsx` files |

---

## 📁 Project Structure

```
Carfashion/
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── ai/              # AI Assistant chat
│   │   ├── auth/            # AuthModal, ProfileDropdown
│   │   ├── booking/         # Form, Summary, QR, SignaturePad
│   │   ├── cars/            # CarCard, Filters, Gallery, Rating
│   │   ├── common/          # Navbar, Footer, Toasts
│   │   ├── dashboard/       # Passport, Stats, History
│   │   └── home/            # Hero, Search, AI features
│   │
│   ├── context/
│   │   ├── AppContext.jsx
│   │   └── AuthContext.jsx
│   │
│   ├── data/
│   │   ├── cars.js
│   │   └── locations.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useLocalStorage.js
│   │   ├── useLucide.js
│   │   └── useScrollProgress.js
│   │
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Booking.jsx
│   │   ├── CarDetails.jsx
│   │   ├── Cars.jsx
│   │   ├── Contact.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── MyBooking.jsx
│   │   ├── NotFound.jsx
│   │   └── Profile.jsx
│   │
│   ├── services/
│   │   └── aiEngine.js
│   │
│   ├── utils/
│   │   ├── auth.js
│   │   ├── format.js
│   │   └── storage.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
└── README.md
```

---

## 🎯 How the AI Works

The `aiEngine.js` service implements **rule-based NLP** — no external API calls, no keys, no cost. It uses regex matching and keyword extraction:

```js
// Example: "SUV for 5 people with luggage under ₹5000/day"
// The engine extracts:
// - people: 5        → filters seats >= 5
// - luggage: yes     → filters bootSpace >= 400L
// - budget: 5000     → filters pricePerDay <= 5000
// Returns top 3 by popularity, with human-readable reasoning.
```

This keeps the demo **fully offline**, **privacy-friendly**, and **blazing fast**.

---

## 🧪 Testing the Flows

### 🔐 Auth Flow

1. Click **Login** in the navbar → switch to **Sign Up**
2. Fill the form → Submit → auto-login
3. Avatar appears in navbar → open dropdown → see stats
4. Navigate to `/profile` → edit name → save

### ⭐ Rating Flow

1. Open any car (e.g., `/cars/1`)
2. Scroll to **Ratings & Reviews**
3. If not logged in → click **"Login to Review"** → modal opens
4. After login → pick stars → write review → Submit
5. Review appears instantly; average recalculates

### 🛒 Booking Flow

1. Browse `/cars` → filter/sort
2. Click **Book** on a car → fill booking form
3. Sign the digital agreement with mouse/finger
4. Confirm → QR code generated → view in `/dashboard`

---

## 🚢 Deployment

This project is deployed on **Vercel** with automatic deployments.

### Deploy your own copy

1. Fork this repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your fork
4. Vercel auto-detects Vite → click **Deploy**

The included `vercel.json` handles SPA routing so direct URL access works correctly.

### Environment Variables

This project requires **no environment variables**. All demo data is stored client-side.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the project
2. **Create** your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/):
`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `chore:`

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Author

**Saniya**

[![GitHub](https://img.shields.io/badge/GitHub-saniya784-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/saniya784)
[![Repository](https://img.shields.io/badge/Repo-Carfashion-2563EB?style=for-the-badge&logo=git&logoColor=white)](https://github.com/saniya784/Carfashion)
[![Live Demo](https://img.shields.io/badge/Live-Demo-7C3AED?style=for-the-badge&logo=vercel&logoColor=white)](https://carfashion-orpin.vercel.app)

---

## 🙏 Acknowledgements

- Icons by [Lucide](https://lucide.dev)
- Car photos by [Unsplash](https://unsplash.com)
- Fonts: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif)
- Hosting by [Vercel](https://vercel.com)

---

## ⭐ Show Your Support

If this project helped you or inspired you, please give it a ⭐ on GitHub — it means a lot!

<div align="center">

### 🚗 [**Try CarFashion Live →**](https://carfashion-orpin.vercel.app)

**Made with ❤️ and a lot of ☕**

[⬆ Back to Top](#-carfashion)

</div>
