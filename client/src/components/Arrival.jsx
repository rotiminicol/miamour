import Img1 from "../assets/Girl1.png";
import Img2 from "../assets/girl2.png";
import Img3 from "../assets/boy2.png";
import Img4 from "../assets/girl4.png";
import Img5 from "../assets/boy1.png";
import Img6 from "../assets/girl6.png";
import Img7 from "../assets/girl7.png";
import Img8 from "../assets/boy3.png";
import Img9 from "../assets/girl9.png";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ServicesData = [
  {
    id: 1,
    images: [Img1, Img1, Img1],
    name: "Sophia Williams",
    age: 28,
    nationality: "American",
    description:
      "Sophia is a cheerful, ambitious woman with a passion for cooking and travel. She is looking for someone who values family and growth.",
  },
  {
    id: 2,
    images: [Img2, Img2, Img2],
    name: "Amara Chukwu",
    age: 30,
    nationality: "Nigerian",
    description:
      "Amara is a kind-hearted teacher who loves literature and volunteering. She dreams of building a loving and supportive partnership.",
  },
  {
    id: 3,
    images: [Img3, Img3, Img3],
    name: "Li Wei",
    age: 26,
    nationality: "Chinese",
    description:
      "Li is a creative designer with a love for art and nature. She hopes to find someone who shares her adventurous spirit.",
  },
  {
    id: 4,
    images: [Img4, Img4, Img4],
    name: "Isabella Rossi",
    age: 32,
    nationality: "Italian",
    description:
      "Isabella is a talented chef who values tradition and family. She is looking for someone to share her love of life and laughter.",
  },
  {
    id: 5,
    images: [Img5, Img5, Img5],
    name: "Fatima Khan",
    age: 29,
    nationality: "Pakistani",
    description:
      "Fatima is a caring doctor with a passion for helping others. She hopes to find a partner who shares her values and dreams.",
  },
  {
    id: 6,
    images: [Img6, Img6, Img6],
    name: "Marie Dubois",
    age: 27,
    nationality: "French",
    description:
      "Marie is an elegant fashion enthusiast who loves exploring cultures and cuisines. She seeks a thoughtful and adventurous partner.",
  },
  {
    id: 7,
    images: [Img7, Img7, Img7],
    name: "Isabella Rossi",
    age: 32,
    nationality: "Italian",
    description:
      "Isabella is a talented chef who values tradition and family. She is looking for someone to share her love of life and laughter.",
  },
  {
    id: 8,
    images: [Img8, Img8, Img8],
    name: "Fatima Khan",
    age: 29,
    nationality: "Pakistani",
    description:
      "Fatima is a caring doctor with a passion for helping others. She hopes to find a partner who shares her values and dreams.",
  },
  {
    id: 9,
    images: [Img9, Img9, Img9],
    name: "Marie Dubois",
    age: 27,
    nationality: "French",
    description:
      "Marie is an elegant fashion enthusiast who loves exploring cultures and cuisines. She seeks a thoughtful and adventurous partner.",
  },
];

const Arrival = () => {
  const [currentImages, setCurrentImages] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleImageChange = (serviceId, direction) => {
    setCurrentImages((prev) => {
      const current = prev[serviceId] || 0;
      const totalImages = ServicesData.find((s) => s.id === serviceId).images.length;
      let newIndex;
      if (direction === "next") {
        newIndex = (current + 1) % totalImages;
      } else {
        newIndex = current === 0 ? totalImages - 1 : current - 1;
      }
      return { ...prev, [serviceId]: newIndex };
    });
  };

  const handleJoinNow = () => {
    navigate("/auth"); // Redirect to the AuthPage
  };

  return (
    <div className="relative">
      <div className="mt-10 py-10 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block relative">
              <h1 className="text-6xl font-bold text-gray-800 mb-4 relative z-10 tracking-tight">
                Meet Our Members
              </h1>
              <div className="absolute -bottom-3 left-0 w-full h-3 bg-pink-200 transform -skew-x-6 -z-0 opacity-50"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-8 leading-relaxed">
              Discover amazing individuals who are ready to embark on the journey of love and commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ServicesData.slice(0, 9).map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
                onMouseEnter={() => setHoveredCard(member.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-[300px] w-full">
                  <div className="absolute inset-0 w-full h-full">
                    {member.images.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                          (currentImages[member.id] || 0) === index ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${member.name} - ${index + 1}`}
                          className="w-full h-full object-cover rounded-t-xl"
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    className={`absolute inset-0 flex items-center justify-between px-3 transition-opacity duration-300 ${
                      hoveredCard === member.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleImageChange(member.id, "prev");
                      }}
                      className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-300"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-800" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleImageChange(member.id, "next");
                      }}
                      className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-300"
                    >
                      <ArrowRight className="w-5 h-5 text-gray-800" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {member.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          (currentImages[member.id] || 0) === index ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-xl font-semibold text-gray-800">{member.name}</h1>
                      <div className="text-sm text-gray-600">
                        <span>Age: {member.age}</span> | <span>Nationality: {member.nationality}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 text-gray-600 text-sm">{member.description}</div>
                  <button
                    onClick={handleJoinNow}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arrival;