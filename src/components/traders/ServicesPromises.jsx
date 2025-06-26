import {
  FaShieldAlt,
  FaClock,
  FaStar,
  FaHandshake,
  FaTools,
  FaHeadset,
  FaAward,
  FaHeart,
} from "react-icons/fa";

const ServicePromises = () => {
  const promises = [
    {
      icon: FaShieldAlt,
      title: "Fully Insured & Licensed",
      description:
        "Complete peace of mind with comprehensive insurance coverage and full licensing for all our services.",
    },
    {
      icon: FaClock,
      title: "Punctual & Reliable",
      description:
        "We value your time. Our team arrives on schedule and completes work efficiently without compromising quality.",
    },
    {
      icon: FaStar,
      title: "5-Star Quality Guarantee",
      description:
        "Every job is completed to the highest standards with our quality guarantee and customer satisfaction promise.",
    },
    {
      icon: FaHandshake,
      title: "Transparent Pricing",
      description:
        "No hidden costs or surprises. We provide clear, upfront pricing with detailed quotes for all services.",
    },
    {
      icon: FaTools,
      title: "Expert Craftsmanship",
      description:
        "Skilled professionals with years of experience in their respective trades, ensuring superior workmanship.",
    },
    {
      icon: FaHeadset,
      title: "24/7 Customer Support",
      description:
        "Round-the-clock support for emergencies and ongoing communication throughout your project.",
    },
    {
      icon: FaAward,
      title: "Award-Winning Service",
      description:
        "Recognized for excellence in customer service and quality work across all our service areas.",
    },
    {
      icon: FaHeart,
      title: "Customer-First Approach",
      description:
        "Your satisfaction is our priority. We go above and beyond to exceed your expectations.",
    },
  ];

  return (
    <div className="py-8 from-blue-50 to-indigo-100">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          {/* <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Our Service Promises
          </h2> */}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {promises.map((promise, index) => {
            const IconComponent = promise.icon;
            return (
              <div
                key={index}
                className="p-6 transition-all duration-300 transform bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 transition-colors duration-300 bg-blue-100 rounded-full group-hover:bg-blue-200">
                    <IconComponent size={28} className="text-blue-600" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    {promise.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {promise.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="max-w-4xl p-8 mx-auto bg-white border border-gray-100 shadow-lg rounded-2xl">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Why Choose Trade Specialists?
            </h3>
            <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
              <div>
                <div className="mb-2 text-3xl font-bold text-blue-600">
                  500+
                </div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="mb-2 text-3xl font-bold text-blue-600">5+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="mb-2 text-3xl font-bold text-blue-600">
                  100%
                </div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePromises;
