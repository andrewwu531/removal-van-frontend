// src/App.jsx
import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BookingForm from "./components/BookingForm";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans text-gray-900">
      <Header />
      <HeroSection />
      <BookingForm />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
