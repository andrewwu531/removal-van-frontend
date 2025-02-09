// src/components/ContactSection.jsx
import React from "react";

const ContactSection = () => (
  <section id="contact" className="py-16 bg-gray-50">
    <div className="container px-4 mx-auto">
      <div className="flex flex-col max-w-3xl m-6 mx-auto text-center bg-white rounded shadow py-14">
        <p className="text-3xl font-bold mb-7">Contact Us</p>
        <p>
          <strong>Phone:</strong> (+44) 7943059792
        </p>
        <p>
          <strong>Email:</strong> trusted.removal.services@gmail.com
        </p>

        <p>
          <strong>Address:</strong> Paisley Road West, Glasgow
        </p>
        {/* <div className="mt-4">
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
        </div> */}
      </div>
    </div>
  </section>
);

export default ContactSection;
