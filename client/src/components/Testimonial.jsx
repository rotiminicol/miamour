import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialData = [
  {
    id: 1,
    name: "Amara & Tunde",
    text: "We are so grateful for the amazing wedding services. From planning to execution, everything was perfect. Thank you for making our day unforgettable!",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Sophia & John",
    text: "The team made our special day truly magical. Every detail was taken care of beautifully. Highly recommend their services!",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Olivia & Michael",
    text: "Thank you for making our dream wedding come true. Everything exceeded our expectations!",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 4,
    name: "Emma & David",
    text: "From start to finish, everything was handled with love and professionalism. It was everything we hoped for and more.",
    img: "https://picsum.photos/103/103",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-20 mt-20 bg-gradient-to-b from-pink-100 via-white to-pink-50">
      <div className="container mx-auto px-6">
        {/* Header section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-pink-700 font-serif">
            Our Happy Couples
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Stories of love and joy from our cherished couples.
          </p>
        </div>

        {/* Testimonial cards */}
        <div>
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="px-3">
                <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-lg h-full transform transition-transform duration-300 hover:-translate-y-2">
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt={data.name}
                      className="rounded-full w-24 h-24 object-cover shadow-sm"
                    />
                  </div>
                  <div className="text-center space-y-3 flex-1">
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      {data.text}
                    </p>
                    <h1 className="text-lg font-bold text-pink-800 font-serif">
                      {data.name}
                    </h1>
                  </div>
                  <div className="absolute top-4 right-4 opacity-10">
                    <p className="text-5xl text-pink-300 leading-none">♥</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;