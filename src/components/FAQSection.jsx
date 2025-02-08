// src/components/FAQSection.jsx
import React from "react";

const FAQSection = () => (
  <section id="faq" className="py-16 bg-blue-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">FAQ</h2>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h3 className="font-bold">General Questions</h3>
          <p>
            <strong>Q: What is [YourPlatformName]?</strong>
            <br />
            A: [YourPlatformName] is a digital marketplace that connects
            homeowners with trusted removal service providers, offering a
            streamlined booking process and transparent pricing.
          </p>
          <p className="mt-2">
            <strong>Q: How does the platform work?</strong>
            <br />
            A: Customers can search for removal companies, compare quotes and
            reviews, and book services directly online. Providers join our
            network to receive quality leads and grow their business.
          </p>
        </div>
        <div className="mb-6">
          <h3 className="font-bold">For Customers</h3>
          <p>
            <strong>Q: How do I book a removal service?</strong>
            <br />
            A: Simply enter your move details, review the list of available
            providers, select the one that best fits your needs, and complete
            your booking through our secure payment system.
          </p>
          <p className="mt-2">
            <strong>Q: Is there any hidden cost for customers?</strong>
            <br />
            A: No, customers pay only for the service provided. The 35%
            commission is charged to the removal companies upon successful
            client acquisition.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default FAQSection;
