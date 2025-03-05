import home_removal_image from "../assets/home-removal.png";
import business_removal_image from "../assets/business-removal.png";
import booking_form_image from "../assets/booking-form.png";

const HeroSectionDesktop = () => {
  // Data for the four photo cards
  const photos = [
    {
      imgSrc: home_removal_image,
      alt: "Photo 1",
      title: "Residential Removal",
      text: "Move home furniture and dispose of unwanted items. We accept same day, short notice & long distance removal services. Call us now for further inquiries.",
      linkText: "Contact Team",
      linkUrl: "#booking-form",
    },
    {
      imgSrc: business_removal_image,
      alt: "Photo 2",
      title: "Business Asset Relocations",
      text: "Help businesses relocate office equipment and inventory. Our removal service comes with an insurance guarantee to cover for any damages.",
      linkText: "Contact Team",
      linkUrl: "#booking-form",
    },
    {
      imgSrc: booking_form_image,
      alt: "Photo 3",
      title: "Customer Protection",
      text: "Our professional removal team is trained to package and load your furniture and office equipment with care. We use lifting tools, traps, safety blankets and moving boxes while moving your items.",
      linkText: "Contact Team",
      linkUrl: "#booking-form",
    },
    // {
    //   imgSrc: contact_us_image,
    //   alt: "Photo 4",
    //   title: "Title for Photo 4",
    //   text: "Description for Photo 4.",
    //   linkText: "View Details",
    //   linkUrl: "#",
    // },
  ];

  return (
    <section
      id="removal-services"
      className="flex flex-col pt-5 pb-10 bg-white text-blue-950"
    >
      <div className="flex flex-row items-start w-full px-8 mx-auto xl:px-10 2xl:px-90 [@media(min-height:1200px)]:!px-28 [@media(min-height:1800px)]:!pt-42 [@media(min-height:1200px)]:!pt-26 [@media(min-height:800px)]:pt-5 [@media(min-height:850px)]:pt-10 [@media(min-height:950px)]:pt-14">
        {/* Left Column
        <div className="w-[calc(100vw-62vw-10vw)] ml-10 xl:ml-12 2xl:ml-14 bg-blue-950 pl-10 rounded-2xl px-12 mx-12">
          <div className="pt-8 xl:pt-14 2xl:pt-14 [@media(min-height:1200px)]:!pt-24 [@media(min-height:900px)]:pt-18 [@media(min-height:980px)]:pt-14">
            <h1 className="text-gray-100 pb-1 2xl:pb-2 text-4xl font-bold text-left xl:text-3xl 2xl:text-4xl [@media(min-height:1200px)]:!text-7xl [@media(min-height:980px)]:text-5xl">
              Home &amp; Business
            </h1>
            <h1 className=" text-gray-100 text-4xl font-bold text-left pb-7 xl:pb-10 2xl:pb-10 [@media(min-height:1200px)]:!pb-30 [@media(min-height:980px)]:pb-18 xl:text-3xl 2xl:text-4xl [@media(min-height:1200px)]:!text-7xl [@media(min-height:980px)]:text-5xl">
              Removal Services
            </h1>
          </div>
          <p className="text-gray-100 text-lg pr-18 [@media(min-height:1200px)]:!pr-38 pb-20 xl:pb-36 2xl:pb-36 [@media(min-height:1200px)]:!pb-68 [@media(min-height:980px)]:pb-60 xl:text-lg 2xl:text-lg xl:pr-20 2xl:pr-20 [@media(min-height:1200px)]:!text-5xl [@media(min-height:980px)]:text-2xl">
            A seamless, transparent, and reliable way to book professional
            removal services. Whether you’re moving home furniture or business
            assets, we’re here for you!
          </p>
          <a
            href="#booking"
            className="flex mb-20 bg-green-600 w-[175px] xl:w-[180px] 2xl:w-[190px] [@media(min-height:1200px)]:!w-[360px] [@media(min-height:980px)]:w-[240px] text-gray-50 font-medium text-lg xl:text-md [@media(min-height:1200px)]:!text-4xl [@media(min-height:980px)]:text-2xl py-3 xl:py-3.5 2xl:py-3.5 [@media(min-height:1200px)]:!py-8 [@media(min-height:980px)]:py-5 rounded-md [@media(min-height:1200px)]:!rounded-2xl
                      align-middle justify-center transform transition duration-300 hover:scale-104"
          >
            Book Removal
          </a>
        </div> */}

        <div className="grid grid-cols-3 gap-7">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden bg-white shadow-md rounded-2xl"
            >
              {/* Image */}
              <img
                src={photo.imgSrc}
                alt={photo.alt}
                className="object-cover w-full h-48 rounded-2xl"
              />

              {/* Card Content - Ensures content fills remaining space */}
              <div className="px-7 pt-5 pb-5 flex flex-col flex-grow min-h-[255px]">
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {photo.title}
                </h3>
                <p className="flex-grow text-gray-600">{photo.text}</p>

                {/* Link forced to the bottom */}
                <a
                  href={photo.linkUrl}
                  className="mt-auto font-bold text-indigo-600 text-md hover:underline"
                >
                  {photo.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        {/* <div className="w-[calc(100vw-38vw)] mr-6 xl:mr-10 2xl:mr-20 mt-2 xl:mt-6 2xl:mt-6 ">
          <div className="grid grid-cols-2 gap-2 p-2 xl:gap-3 2xl:gap-3.5 [@media(min-height:1200px)]:!gap-6 xl:p-3 2xl:p-3">
            {cards.map((card, index) => (
              <a href="#booking" key={index} className="block">
                <div className="relative h-56 [@media(min-height:1900px)]:!h-160 [@media(min-height:1700px)]:!h-128 [@media(min-height:1400px)]:!h-115  [@media(min-height:980px)]:h-82 [@media(min-height:900px)]:h-68 overflow-hidden transition duration-500 transform rounded-md [@media(min-height:1200px)]:!rounded-xl shadow cursor-pointer xl:h-60 2xl:h-60 hover:scale-102">
                  <img
                    src={card.image}
                    alt={card.text}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 z-10 flex items-end justify-end">
                    <div className="px-4 py-2 [@media(min-height:1200px)]:!rounded-lg rounded xl:px-5.5 2xl:px-5 [@media(min-height:1200px)]:!py-6 [@media(min-height:1700px)]:!px-16 [@media(min-height:1400px)]:!px-14 [@media(min-height:980px)]:px-7 [@media(min-height:980px)]:py-3 bg-gray-950 bg-opacity-80">
                      <p className="font-medium tracking-wide text-gray-100 text-md text-md xl:text-lg 2xl:text-lg [@media(min-height:1200px)]:!text-4xl [@media(min-height:980px)]:text-2xl">
                        {card.text}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSectionDesktop;
