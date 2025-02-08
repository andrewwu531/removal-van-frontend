// src/components/HeroSection.jsx
import React from "react";

const HeroSection = () => (
  <section id="home" className="bg-blue-900 text-white pt-12 pb-16">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 mx-96">
        Trusted Home &amp; Business Removal Services
      </h1>
      <p className="text-lg md:text-xl mx-80">
        A seamless, transparent, and reliable way to book professional removal
        services. Whether you’re moving home furniture or business assets, we’re
        here to help!
      </p>
      {/* Key Benefits
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
        <div className="bg-white text-blue-900 rounded shadow p-4">
          <h3 className="font-bold mb-2">Curated Listings</h3>
          <p>Access a network of vetted removal companies.</p>
        </div>
        <div className="bg-white text-blue-900 rounded shadow p-4">
          <h3 className="font-bold mb-2">Transparent Pricing</h3>
          <p>Removal with no hidden fees!</p>
        </div>
        <div className="bg-white text-blue-900 rounded shadow p-4">
          <h3 className="font-bold mb-2">Easy Booking</h3>
          <p>Schedule your move online with just a few clicks.</p>
        </div>
      </div> */}
    </div>
  </section>
);

export default HeroSection;
