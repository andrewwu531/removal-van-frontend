import React, { useState } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDateInput from "../booking/components/CustomDateInput";
import emailjs from "@emailjs/browser";

const EnquiryForm = ({ onComplete, currentService = "Removal" }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    telephone: "",
    serviceType: currentService,
    preferredDate: new Date().toISOString(),
    message: "",
    urgency: "Standard",
    // Service-specific fields
    bedrooms: "",
    pickupLocation: "",
    destinationLocation: "",
    // Additional fields for different services
    roomCount: "",
    propertyType: "",
    projectType: "",
    damageType: "",
    electricalWork: "",
    gasWork: "",
    exteriorWork: "",
    roofingWork: "",
    solarType: "",
    windowType: "",
    doorType: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // Service-specific field configurations
  const getServiceFields = (serviceType) => {
    const baseFields = {
      Removal: {
        bedrooms: {
          label: "Number of Bedrooms",
          type: "select",
          options: ["1", "2", "3", "4", "5+"],
        },
        pickupLocation: {
          label: "Pickup Location",
          type: "text",
          placeholder: "e.g., Edinburgh City Centre",
        },
        destinationLocation: {
          label: "Destination Location",
          type: "text",
          placeholder: "e.g., Glasgow West End",
        },
      },
      Painting: {
        roomCount: {
          label: "Number of Rooms",
          type: "select",
          options: ["1", "2", "3", "4", "5+"],
        },
        propertyType: {
          label: "Property Type",
          type: "select",
          options: ["Residential", "Commercial", "Both"],
        },
      },
      "Carpet & Flooring": {
        roomCount: {
          label: "Number of Rooms",
          type: "select",
          options: ["1", "2", "3", "4", "5+"],
        },
        propertyType: {
          label: "Property Type",
          type: "select",
          options: ["Residential", "Commercial", "Both"],
        },
      },
      "Bathroom & Kitchen": {
        roomCount: {
          label: "Number of Rooms",
          type: "select",
          options: ["1", "2", "3", "4", "5+"],
        },
        propertyType: {
          label: "Property Type",
          type: "select",
          options: ["Residential", "Commercial", "Both"],
        },
      },
      "Window & Door": {
        roomCount: {
          label: "Number of Windows/Doors",
          type: "select",
          options: ["1-2", "3-5", "6-10", "10+"],
        },
        propertyType: {
          label: "Property Type",
          type: "select",
          options: ["Residential", "Commercial", "Both"],
        },
      },
      "Exterior & Roofing": {
        propertyType: {
          label: "Property Type",
          type: "select",
          options: ["Residential", "Commercial", "Both"],
        },
      },
      "Solar Panels": {
        propertyType: {
          label: "Property Type",
          type: "select",
          options: ["Residential", "Commercial", "Both"],
        },
      },
      "Commercial Maintenance": {
        propertyType: {
          label: "Property Type",
          type: "select",
          options: ["Office", "Retail", "Industrial", "Other"],
        },
      },
    };

    return baseFields[serviceType] || baseFields["Removal"];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, preferredDate: date ? date.toISOString() : "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.telephone.trim())
      newErrors.telephone = "Telephone is required";
    if (!formData.urgency) newErrors.urgency = "Please select urgency level";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateEmailContent = () => {
    const serviceFields = getServiceFields(formData.serviceType);
    let additionalInfo = "";

    // Build additional info based on service type
    Object.keys(serviceFields).forEach((field) => {
      if (formData[field]) {
        additionalInfo += `• ${serviceFields[field].label}: ${formData[field]}\n`;
      }
    });

    return `New Service Enquiry

Service Type: ${formData.serviceType}
Full Name: ${formData.fullName}
Email: ${formData.email}
Telephone: ${formData.telephone}
Preferred Date: ${new Date(formData.preferredDate).toLocaleDateString()}

Additional Information:
${additionalInfo}

Message:
${formData.message || "No additional message provided"}

---
This enquiry was submitted through the Trade Specialists website.`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Prepare service details for email
      const serviceFields = getServiceFields(formData.serviceType);
      const serviceDetails = [];

      Object.keys(serviceFields).forEach((field) => {
        if (formData[field]) {
          serviceDetails.push({
            label: serviceFields[field].label,
            value: formData[field],
          });
        }
      });

      // Prepare email template parameters
      const templateParams = {
        to_email: "admin@trade-specialists.com",
        from_name: formData.fullName,
        from_email: formData.email,
        serviceType: formData.serviceType,
        fullName: formData.fullName,
        email: formData.email,
        telephone: formData.telephone,
        preferredDate: new Date(formData.preferredDate).toLocaleDateString(
          "en-GB"
        ),
        urgency: formData.urgency,
        enquiryDate: new Date().toLocaleDateString("en-GB"),
        message: formData.message || "No additional message provided",
        serviceDetails: serviceDetails,
        subject: `New ${formData.serviceType} Enquiry from ${formData.fullName}`,
      };

      console.log("Sending email with params:", templateParams);

      // Send email using EmailJS
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_ENQUIRY_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("EmailJS response:", response);

      if (response.status === 200) {
        console.log("Email sent successfully!");
      } else {
        console.error("EmailJS returned non-200 status:", response.status);
      }

      setIsProcessing(false);
      onComplete(formData);
    } catch (error) {
      console.error("Error sending enquiry:", error);
      setIsProcessing(false);
      alert(
        "There was an error sending your enquiry. Please try again or contact us directly."
      );
    }
  };

  const renderServiceFields = () => {
    const serviceFields = getServiceFields(formData.serviceType);

    return Object.entries(serviceFields).map(([fieldName, fieldConfig]) => (
      <div key={fieldName} className="mb-3 w-full">
        <label
          htmlFor={fieldName}
          className="block font-medium text-gray-700 text-md"
        >
          {fieldConfig.label}
        </label>
        {fieldConfig.type === "select" ? (
          <div className="relative">
            <select
              id={fieldName}
              name={fieldName}
              value={formData[fieldName]}
              onChange={handleInputChange}
              autoComplete="off"
              className={`block w-full pl-4 pr-10 py-3.5 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none text-[15px] appearance-none ${
                errors[fieldName] ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select {fieldConfig.label}</option>
              {fieldConfig.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span
              className="flex absolute inset-y-0 items-center text-black pointer-events-none"
              style={{ right: "7px", top: "1px " }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path
                  d="M6 8L10 12L14 8"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        ) : (
          <input
            type="text"
            id={fieldName}
            name={fieldName}
            value={formData[fieldName]}
            onChange={handleInputChange}
            placeholder={fieldConfig.placeholder}
            autoComplete="off"
            className={`block w-full pl-4 pr-4 py-3.5 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none text-[15px] ${
              errors[fieldName] ? "border-red-500" : "border-gray-300"
            }`}
          />
        )}
        {errors[fieldName] && (
          <p className="mt-1 text-sm text-red-500">{errors[fieldName]}</p>
        )}
      </div>
    ));
  };

  // Add this function temporarily to test EmailJS
  const testEmailJS = async () => {
    try {
      console.log("Testing EmailJS connection...");
      console.log("Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
      console.log(
        "Template ID:",
        import.meta.env.VITE_EMAILJS_ENQUIRY_TEMPLATE_ID
      );
      console.log("Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_ENQUIRY_TEMPLATE_ID,
        {
          to_email: "admin@trade-specialists.com",
          from_name: "Test User",
          from_email: "test@example.com",
          serviceType: "Test Service",
          fullName: "Test User",
          email: "test@example.com",
          telephone: "123456789",
          preferredDate: "01/01/2024",
          urgency: "Standard",
          enquiryDate: "01/01/2024",
          message: "This is a test message",
          subject: "Test Enquiry",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("Test email sent successfully:", response);
    } catch (error) {
      console.error("Test email failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="px-6 mt-10 mb-10 text-4xl font-semibold text-center text-gray-800">
        Enquiry Form
      </h2>
      <div className="px-6 pb-16">
        {/* Basic Information */}
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-medium text-gray-800">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label
                htmlFor="fullName"
                className="block font-medium text-gray-700 text-md"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                autoComplete="name"
                className={`block w-full pl-4 pr-4 py-3.5 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none text-[15px] ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700 text-md"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                className={`block w-full pl-4 pr-4 py-3.5 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none text-[15px] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="telephone"
                className="block font-medium text-gray-700 text-md"
              >
                Telephone Number *
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                required
                autoComplete="tel"
                className={`block w-full pl-4 pr-4 py-3.5 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none text-[15px] ${
                  errors.telephone ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div>
              <label
                htmlFor="serviceType"
                className="block font-medium text-gray-700 text-md"
              >
                Service Type
              </label>
              <div className="relative">
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className={`block w-full pl-4 pr-10 py-3.5 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none text-[15px] appearance-none ${
                    errors.serviceType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="Removal">Removal</option>
                  <option value="Painting">Painting</option>
                  <option value="Carpet & Flooring">Carpet & Flooring</option>
                  <option value="Bathroom & Kitchen">Bathroom & Kitchen</option>
                  <option value="Window & Door">Window & Door</option>
                  <option value="Exterior & Roofing">Exterior & Roofing</option>
                  <option value="Solar Panels">Solar Panels</option>
                  <option value="Commercial Maintenance">
                    Commercial Maintenance
                  </option>
                </select>
                <span
                  className="flex absolute inset-y-0 items-center text-black pointer-events-none"
                  style={{ right: "7px", top: "1px " }}
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M6 8L10 12L14 8"
                      stroke="#6B7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Service-Specific Fields */}
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-medium text-gray-800">
            Service Details
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {renderServiceFields()}
          </div>
        </div>
        {/* Date and Message */}
        <div className="mb-6">
          <h3 className="mb-4 text-lg font-medium text-gray-800">
            Additional Information
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label
                htmlFor="preferredDate"
                className="block font-medium text-gray-700 text-md"
              >
                Preferred Date *
              </label>
              <DatePicker
                id="preferredDate"
                selected={
                  formData.preferredDate
                    ? new Date(formData.preferredDate)
                    : null
                }
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                customInput={<CustomDateInput id="preferredDate" />}
                wrapperClassName="w-full"
                showPopperArrow={false}
                autoComplete="off"
              />
            </div>
            <div>
              <label
                htmlFor="urgency"
                className="block font-medium text-gray-700 text-md"
              >
                Urgency
              </label>
              <div className="relative">
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className={`block w-full pl-4 pr-10 py-3.5 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none text-[15px] appearance-none ${
                    errors.urgency ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="Standard">Standard</option>
                  <option value="Express">Express</option>
                  <option value="Same Day">Same Day</option>
                  <option value="Same Week">Same Week</option>
                  <option value="Emergency">Emergency</option>
                </select>
                <span
                  className="flex absolute inset-y-0 items-center text-black pointer-events-none"
                  style={{ right: "7px", top: "1px " }}
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M6 8L10 12L14 8"
                      stroke="#6B7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <label
              htmlFor="message"
              className="block font-medium text-gray-700 text-md"
            >
              Additional Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              placeholder="Please provide any additional details about your requirements"
              className={`block w-full pl-4 pr-4 py-3.5 mt-1 bg-white border border-gray-300 rounded-md focus:outline-none text-[15px] resize-none ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>
        {/* Information Box */}
        <div className="p-5 mt-8 bg-blue-50 rounded-lg">
          <p className="px-2 py-1 text-blue-800">
            We'll get back to you within 24 hours with a quote and available
            dates. For urgent enquiries, please call us at{" "}
            <a
              href="tel:+447943059792"
              className="text-blue-600 underline hover:text-blue-800"
            >
              (+44) 07943 059 792
            </a>
          </p>
        </div>
        {/* Submit Button */}
        <div className="mt-2 text-left">
          <button
            type="submit"
            disabled={isProcessing}
            className={`px-11 py-4.5 mt-8 font-semibold text-lg text-white ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:scale-102"
            } rounded-4xl focus:outline-none`}
          >
            {isProcessing ? "Sending..." : "Send Enquiry"}
          </button>
        </div>
        {/* Add this button temporarily to test (add it before the submit button)
        <button
          type="button"
          onClick={testEmailJS}
          className="px-4 py-2 mr-4 text-white bg-gray-500 rounded"
        >
          Test EmailJS
        </button> */}
      </div>
    </form>
  );
};

EnquiryForm.propTypes = {
  onComplete: PropTypes.func.isRequired,
  currentService: PropTypes.string,
};

export default EnquiryForm;
