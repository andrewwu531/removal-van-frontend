import React, { useState } from "react";

const faqs = [
  {
    question: "What is our mission?",
    answer:
      "Trusted Home & Business Removal is a Scottish-based moving company dedicated to providing reliable, efficient, and stress-free relocation services. We help individuals move their home furniture safely to new locations and assist businesses in transporting their assets with care and professionalism.",
  },
  {
    question: "How does the platform work?",
    answer:
      "Once you enter your removal details, we will generate a price quote for your move. After confirming your payment, you will receive a confirmation email with the scheduled delivery date and the details you provided. In the rare event that we are unable to complete the removal on the designated date, we will contact you promptly to arrange an alternative delivery date at your earliest convenience.",
  },
  {
    question: "How do we contact you?",
    answer:
      "If you want to reach out for any further questions, feel free to contact us at (+44) 7943059792 or trusted.removal.services@gmail.com. We will respond to you as soon as possible, within 1-2 days.",
  },
  {
    question: "Where can we find the legal & privacy policy?",
    answer:
      "We are a registered UK company that fully complies with legal and privacy regulations. You can access our Legal & Privacy Policy by clicking the link in the footer of our website.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-blue-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center">FAQ</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b border-gray-300">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full px-4 py-3 text-lg font-semibold text-left bg-white rounded-md shadow-md"
              >
                {faq.question}
                <span className="text-gray-500">
                  {openIndex === index ? "▲" : "▼"}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-4 text-gray-700 bg-gray-100 rounded-b-md">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
