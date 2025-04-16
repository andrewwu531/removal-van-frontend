import { useState, useEffect } from "react";
import FooterSection from "./components/FooterSection";
import ServicesList from "./components/ServicesList";
import ContactInfo from "./components/ContactInfo";
import LegalLinks from "./components/LegalLinks";
import {
  primaryServices,
  secondaryServices,
  contactInfo,
} from "./constants/footerData";
import Modal from "./components/Modal";
import TermsContent from "./components/TermsContent";
import PrivacyContent from "./components/PrivacyContent";
import CookieContent from "./components/CookieContent";
import { useLocation } from "react-router-dom";

export default function FooterDesktop() {
  const [modalContent, setModalContent] = useState(null);
  const { pathname } = useLocation();

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const handleClose = () => setModalContent(null);

  const modalConfigs = {
    terms: {
      title: "Terms and Conditions",
      content: <TermsContent />,
    },
    privacy: {
      title: "Privacy Policy",
      content: <PrivacyContent />,
    },
    cookies: {
      title: "Cookie Policy",
      content: <CookieContent />,
    },
  };

  return (
    <>
      <footer className="pb-6 min-[500px]:pb-16 text-white bg-black pt-14 min-[500px]:pt-18">
        <div className="grid w-11/12 mx-auto min-[500px]:grid-cols-3 max-[500px]:grid-cols-1 pb-10 justify-items-center">
          <FooterSection title="Our Services" className="max-[500px]:hidden">
            <ServicesList services={primaryServices} />
          </FooterSection>

          <FooterSection className="pt-15 max-[500px]:hidden">
            <ServicesList services={secondaryServices} />
          </FooterSection>

          <FooterSection title="Contact Us">
            <ContactInfo contactItems={contactInfo} />
          </FooterSection>
        </div>

        {/* <LegalLinks /> */}
      </footer>

      {/* Modal */}
      {modalContent && (
        <Modal
          isOpen={true}
          onClose={handleClose}
          title={modalConfigs[modalContent].title}
        >
          {modalConfigs[modalContent].content}
        </Modal>
      )}
    </>
  );
}
