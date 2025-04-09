import FooterSection from "./components/FooterSection";
import ServicesList from "./components/ServicesList";
import ContactInfo from "./components/ContactInfo";
import {
  primaryServices,
  secondaryServices,
  contactInfo,
} from "./constants/footerData";

export default function FooterDesktop() {
  return (
    <footer className="pb-16 text-white bg-black pt-18">
      <div className="grid w-11/12 grid-cols-3 pb-10 mx-auto justify-items-center">
        <FooterSection title="Our Services">
          <ServicesList services={primaryServices} />
        </FooterSection>

        <FooterSection className="pt-15">
          <ServicesList services={secondaryServices} />
        </FooterSection>

        <FooterSection title="Contact Us">
          <ContactInfo contactItems={contactInfo} />
        </FooterSection>
      </div>
    </footer>
  );
}
