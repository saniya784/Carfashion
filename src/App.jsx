import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';
import ScrollProgress from '@/components/common/ScrollProgress';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import AIAssistant from '@/components/ai/AIAssistant';
import Toasts from '@/components/common/Toasts';
import CompareBar from '@/components/common/CompareBar';

import Home from '@/pages/Home';
import Cars from '@/pages/Cars';
import CarDetails from '@/pages/CarDetails';
import Booking from '@/pages/Booking';
import MyBooking from '@/pages/MyBooking';
import Dashboard from '@/pages/Dashboard';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ScrollProgress />
          <Navbar />
          <main id="main" className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/cars/:id" element={<CarDetails />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/my-booking" element={<MyBooking />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <AIAssistant />
          <Toasts />
          <CompareBar />
        </BrowserRouter>
      </AuthProvider>
    </AppProvider>
  );
}