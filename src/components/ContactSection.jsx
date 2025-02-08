// src/components/ContactSection.jsx
import React from "react";

const ContactSection = () => (
  <section id="contact" className="py-16 bg-gray-100">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <p>
          <strong>Email:</strong> support@[yourplatformname].com
        </p>
        <p>
          <strong>Phone:</strong> (555) 123-4567
        </p>
        <p>
          <strong>Address:</strong> Paisley Road West, Glasgow
        </p>
        <div className="mt-4">
          <p>
            <strong>Social Media:</strong>
          </p>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
