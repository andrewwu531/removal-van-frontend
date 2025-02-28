import background_image from "../assets/background_mobile.png"; // Add your background image

const HeroSectionMobile = () => {
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
        <div className="flex flex-col justify-center w-full [@media(min-height:730px)]:!mt-24 [@media(max-width:340px)]:!mt-12 mt-18">
          <h1 className="pb-2 text-3xl font-bold text-center">
            Home &amp; Business
          </h1>
          <h1 className="pb-12  [@media(max-width:340px)]:!pb-10 text-3xl font-bold text-center">
            Removal Services
          </h1>
          <p className="px-12 text-base text-center pb-32  [@media(max-width:340px)]:!pb-20 [@media(min-height:730px)]:!pb-50">
            A seamless, transparent, and reliable way to book professional
            removal services. Whether you’re moving home furniture or business
            assets, we’re here for you!
          </p>
          <a
            href="#booking"
            className="flex bg-green-600 w-full mx-auto max-w-[180px] text-gray-50 font-medium text-base py-3.5 px-4 rounded-md 
                    align-middle justify-center transform transition duration-300 hover:scale-105"
          >
            Book Removal
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionMobile;
