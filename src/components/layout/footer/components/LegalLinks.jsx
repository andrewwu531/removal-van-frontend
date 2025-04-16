import { Link } from "react-router-dom";
import { HiOutlineDocumentText, HiOutlineShieldCheck } from "react-icons/hi";
import { BiCookie } from "react-icons/bi";

export default function LegalLinks() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const legalLinks = [
    {
      to: "/terms-conditions",
      text: "Terms & Conditions",
      icon: <HiOutlineDocumentText className="w-5 h-5" />,
    },
    {
      to: "/privacy-policy",
      text: "Privacy Policy",
      icon: <HiOutlineShieldCheck className="w-5 h-5" />,
    },
    {
      to: "/cookie-policy",
      text: "Cookie Policy",
      icon: <BiCookie className="w-5 h-5" />,
    },
  ];

  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-white">Legal</h3>
      <div className="flex flex-col space-y-2">
        {legalLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center space-x-2 text-gray-300 transition-colors hover:text-white"
            onClick={handleScrollToTop}
          >
            {link.icon}
            <span>{link.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
