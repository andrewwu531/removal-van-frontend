import home_removal_image from "../assets/home-removal.png";
import business_removal_image from "../assets/business-removal.png";
import booking_form_image from "../assets/booking-form.png";
import contact_us_image from "../assets/contact-us.png";
import background_image from "../assets/background.png"; // Add your background image

const HeroSection = () => {
  const cards = [
    { text: "Home Removal", image: home_removal_image },
    { text: "Business Removal", image: business_removal_image },
    { text: "Booking Form", image: booking_form_image },
    { text: "Contact Us", image: contact_us_image },
  ];

  return (
    <section
      id="home"
      className="flex flex-col min-h-[calc(100vh-100px)] py-10 text-blue-950"
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-row items-start w-full px-8 mx-auto xl:px-10 2xl:px-14 [@media(min-height:1200px)]:!px-28 [@media(min-height:1800px)]:!pt-60 [@media(min-height:1200px)]:!pt-32 [@media(min-height:800px)]:pt-5 [@media(min-height:850px)]:pt-10 [@media(min-height:950px)]:pt-16">
        {/* Left Column */}
        <div className="xl:w-[38%] 2xl:w-[38%] ml-5 lg:ml-10 xl:ml-12 2xl:ml-14">
          <div className="pt-8 xl:pt-14 2xl:pt-14 [@media(min-height:1200px)]:!pt-24 [@media(min-height:900px)]:pt-18 [@media(min-height:980px)]:pt-14">
            <h1 className="pb-1 2xl:pb-2 text-4xl font-bold text-left xl:text-3xl 2xl:text-3xl [@media(min-height:1200px)]:!text-7xl [@media(min-height:980px)]:text-5xl">
              Home &amp; Business
            </h1>
            <h1 className="text-4xl font-bold text-left pb-7 xl:pb-10 2xl:pb-10 [@media(min-height:1200px)]:!pb-30 [@media(min-height:980px)]:pb-18 xl:text-3xl 2xl:text-3xl [@media(min-height:1200px)]:!text-7xl [@media(min-height:980px)]:text-5xl">
              Removal Services
            </h1>
          </div>
          <p className="pb-16 text-lg pr-18 [@media(min-height:1200px)]:!pr-38 lg:pb-20 xl:pb-36 2xl:pb-36 [@media(min-height:1200px)]:!pb-68 [@media(min-height:980px)]:pb-60 xl:text-lg 2xl:text-lg xl:pr-20 2xl:pr-20 [@media(min-height:1200px)]:!text-5xl [@media(min-height:980px)]:text-2xl">
            A seamless, transparent, and reliable way to book professional
            removal services. Whether you’re moving home furniture or business
            assets, we’re here for you!
          </p>
          <a
            href="#booking"
            className="flex  bg-green-600 w-[175px] xl:w-[180px] 2xl:w-[190px] [@media(min-height:1200px)]:!w-[360px] [@media(min-height:980px)]:w-[240px] text-gray-50 font-medium text-lg xl:text-md [@media(min-height:1200px)]:!text-4xl [@media(min-height:980px)]:text-2xl py-3 xl:py-3.5 2xl:py-3.5 [@media(min-height:1200px)]:!py-8 [@media(min-height:980px)]:py-5 rounded-md [@media(min-height:1200px)]:!rounded-2xl
                      align-middle justify-center transform transition duration-300 hover:scale-104"
          >
            Book Removal
          </a>
        </div>

        {/* Right Column */}
        <div className="w-[60%] xl:w-[62%] 2xl:w-[62%] mr-4 lg:mr-6 xl:mr-10 2xl:mr-20 mt-2 xl:mt-6 2xl:mt-6 ">
          <div className="grid grid-cols-2 gap-2 p-2 xl:gap-3 2xl:gap-4 xl:p-3 2xl:p-3">
            {cards.map((card, index) => (
              <a href="#booking" key={index} className="block">
                <div className="relative h-56  [@media(min-height:1200px)]:!h-128 [@media(min-height:900px)]:h-62 [@media(min-height:980px)]:h-82 overflow-hidden transition duration-500 transform rounded-md [@media(min-height:1200px)]:!rounded-xl shadow cursor-pointer xl:h-60 2xl:h-60 hover:scale-102">
                  <img
                    src={card.image}
                    alt={card.text}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 z-10 flex items-end justify-end">
                    <div className="px-4 py-2 [@media(min-height:1200px)]:!rounded-lg rounded xl:px-5.5 2xl:px-5 [@media(min-height:1200px)]:!py-6 [@media(min-height:1200px)]:!px-16 [@media(min-height:980px)]:px-7 [@media(min-height:980px)]:py-3 bg-gray-950 bg-opacity-80">
                      <p className="font-medium tracking-wide text-gray-100 text-md text-md xl:text-lg 2xl:text-lg [@media(min-height:1200px)]:!text-4xl [@media(min-height:980px)]:text-2xl">
                        {card.text}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
