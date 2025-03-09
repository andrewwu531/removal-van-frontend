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
      text: "Move home furniture and dispose of unwanted items. We accept same day, short notice & long distance removal services. You can opt for one or two man for the removal service.",
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
  ];

  return (
    <section
      id="removal-services"
      className="flex flex-col pb-10 min-[2560px]:mt-20 bg-white text-blue-950"
    >
      <div className="flex flex-row items-start w-11/12 min-[1920px]:w-5/6 min-[2560px]:w-3/4 min-[3840px]:w-2/3 mx-auto">
        <div className="grid grid-cols-3 gap-4 min-[2560px]:gap-5">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden bg-white rounded-lg min-[1920px]:rounded-xl shadow-md min-[1920px]:shadow-lg"
            >
              {/* Image */}
              <img
                src={photo.imgSrc}
                alt={photo.alt}
                className="object-cover w-full rounded-md h-60 min-[1920px]:h-70 min-[2560px]:h-80 min-[3840px]:h-90"
              />

              {/* Card Content - Ensures content fills remaining space */}
              <div className="px-7 min-[1920px]:px-11 min-[3840px]:px-14 pt-6 min-[1920px]:pt-8 pb-5 min-[1920px]:pb-8 flex flex-col flex-grow min-h-[250px] min-[1920px]:min-h-[220px] min-[2560px]:min-h-[240px]">
                <h3 className="mb-4 min-[1920px]:mb-5 min-[3840px]:pt-2 text-xl min-[2560px]:text-2xl font-semibold text-gray-800">
                  {photo.title}
                </h3>
                <p className="flex-grow min-[2560px]:text-lg text-gray-600">
                  {photo.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSectionDesktop;
