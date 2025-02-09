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
      <div className="flex flex-col min-h-screen">
        <Header />
        <HeroSection />
      </div>
      <div className="flex flex-col bg-gray-50">
        <BookingForm />
      </div>
      {/* <div className="flex flex-col bg-blue-50">
        <FAQSection />
      </div> */}
      {/* <ContactSection /> */}
      <Footer />
    </div>
  );
}

export default App;
