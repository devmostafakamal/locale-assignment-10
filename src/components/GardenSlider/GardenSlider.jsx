import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const GardenSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Spring Planting Workshop",
      description:
        "Learn how to grow your own organic vegetables with expert gardeners.",
      buttonText: "Register Now",
      image: "/assets/peradeniya-royal-botanic-gardens_.avif", // Replace with your image path
    },
    {
      id: 2,
      title: "Summer Garden Tour",
      description: "Explore the most beautiful private gardens in the city.",
      buttonText: "Book Tour",
      image: "/assets/spring-park-city-park.avif",
    },
    {
      id: 3,
      title: "Autumn Composting Class",
      description: "Turn your garden waste into nutrient-rich compost.",
      buttonText: "Join Class",
      image: "/assets/beautiful-green-park_1417-1448.avif",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-[400px] bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay for better text visibility */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* Slide Content */}
              <div className="relative z-10 text-white max-w-2xl mx-auto text-center px-4">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-6">{slide.description}</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GardenSlider;
