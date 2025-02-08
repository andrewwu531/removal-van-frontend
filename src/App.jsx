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
      <div className="min-h-screen bg-blue-50 flex flex-col">
        <Header />
        <HeroSection />
      </div>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <BookingForm />
      </div>
      <div className="min-h-screen bg-blue-50 flex flex-col">
        <FAQSection />
      </div>
      {/* <ContactSection /> */}
      <Footer />
    </div>
  );
}

export default App;
