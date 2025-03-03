import background_image from "../assets/background_mobile.png"; // Add your background image
import home_removal_image from "../assets/home-removal.png";
import business_removal_image from "../assets/business-removal.png";
import booking_form_image from "../assets/booking-form.png";
import contact_us_image from "../assets/contact-us.png";
import HeroSectionCardsScroll from "./HeroSectionCardsScroll";

const HeroSectionMobile = () => {
  const cards = [
    { text: "Home Removal", image: home_removal_image },
    { text: "Business Removal", image: business_removal_image },
    { text: "Booking Form", image: booking_form_image },
    { text: "Contact Us", image: contact_us_image },
  ];
  return (
    <section
      id="home"
      className="flex flex-col min-h-[calc(100vh-75px)] text-blue-950"
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container flex flex-col justify-center mx-auto">
        {/* Text Content */}
        <div className="flex flex-col justify-center w-full mt-8 [@media(min-height:580px)]:!mt-10 [@media(min-width:720px)]:mt-12 ">
          <h1 className="pb-2 text-3xl font-bold text-center">
            Home &amp; Business
          </h1>
          <h1 className="pb-6 [@media(min-height:580px)]:pb-6 text-3xl font-bold text-center">
            Removal Services
          </h1>
          <p className="px-12 text-base text-center pb-6  [@media(min-height:650px)]:!pb-7 [@media(min-height:730px)]:!pb-10">
            A seamless, transparent, and reliable way to book professional
            removal services. Whether you’re moving home furniture or business
            assets, we’re here for you!
          </p>
          <HeroSectionCardsScroll cards={cards} />
          <a
            href="#booking"
            className="flex bg-green-600 w-full mx-auto max-w-[160px] text-gray-50 font-medium text-base py-3 px-4 [@media(min-width:390px)]:!py-3.5 [@media(min-width:390px)]:!max-w-[180px] rounded-md 
                    align-middle justify-center transform transition duration-300 hover:scale-105 [@media(max-height:680px)]:!mb-10"
          >
            Book Removal
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionMobile;
