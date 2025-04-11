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
    </footer>
  );
}
