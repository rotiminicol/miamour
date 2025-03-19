import Img1 from "../assets/myguy.png";
import Img2 from "../assets/wedding.png";
import Img3 from "../assets/wedding1.png";
import Img4 from "../assets/wedding3.jpg";
import Img5 from "../assets/wedding4.png";
import Img6 from "../assets/wedding5.png";
import Img7 from "../assets/wedding19.png";
import Img8 from "../assets/wedding45.png";
import Img9 from "../assets/wedding56.png";
import Img10 from "../assets/jibo.png";
import Img11 from "../assets/jibo2.png";
import Img12 from "../assets/wedding5.png";
import { useState } from "react";
import { Info, Calendar } from "lucide-react";

const LoveStoriesData = [
  { id: 1, img: Img1, names: "Alex & Mia", yearMet: 2022, story: "From strangers in a coffee shop to soulmates, their love brewed stronger with every shared sunrise.", category: "All" },
  { id: 2, img: Img2, names: "Daniel & Sophia", yearMet: 2023, story: "A chance meeting at a bookstore turned into endless chapters of love and adventure.", category: "Romantic" },
  { id: 3, img: Img3, names: "James & Olivia", yearMet: 2021, story: "What started as a friendly rivalry at the gym became a partnership built on strength and laughter.", category: "Passionate" },
  { id: 4, img: Img4, names: "Liam & Emily", yearMet: 2023, story: "Two tech enthusiasts, one late-night coding session, and an algorithm of love that never fails.", category: "Modern Love" },
  { id: 5, img: Img5, names: "Chris & Ava", yearMet: 2020, story: "A road trip with friends led to a lifetime journey with each other.", category: "Adventure" },
  { id: 6, img: Img6, names: "Ethan & Lily", yearMet: 2022, story: "They met at a wedding, danced like no one was watching, and never let go.", category: "Elegant Love" },
  { id: 7, img: Img7, names: "Noah & Isabella", yearMet: 2023, story: "A simple good morning text turned into forever.", category: "Timeless" },
  { id: 8, img: Img8, names: "Ryan & Charlotte", yearMet: 2022, story: "A shared love for poetry brought them together, and now they write their own love story.", category: "Soulmates" },
  { id: 9, img: Img9, names: "Mason & Zoe", yearMet: 2021, story: "An adventurous hiking trip led them to find not just breathtaking views, but each other.", category: "Adventurous" },
  { id: 10, img: Img10, names: "Logan & Harper", yearMet: 2023, story: "What started as a long-distance friendship blossomed into an unbreakable bond.", category: "Enduring Love" },
  { id: 11, img: Img11, names: "Benjamin & Aria", yearMet: 2022, story: "Their love story started with a smile across a crowded train and never faded.", category: "Classic Romance" },
  { id: 12, img: Img12, names: "William & Grace", yearMet: 2023, story: "A spontaneous duet at karaoke night turned into a love song that never ends.", category: "Serendipity" }
];

const Services = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredServices = selectedFilter === "All" ? LoveStoriesData : LoveStoriesData.filter(service => service.category === selectedFilter);

  return (
    <div id="services" className="relative bg-gradient-to-b from-pink-50 to-white py-20">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Cherished Love Stories</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">Explore heartwarming love stories and moments that define forever.</p>
        
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["All", "Romantic", "Passionate", "Modern Love", "Adventure", "Elegant Love", "Timeless", "Soulmates", "Adventurous", "Enduring Love", "Classic Romance", "Serendipity"].map(category => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedFilter === category
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {filteredServices.map(story => (
            <div key={story.id} className="relative bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105 group">
              <div className="relative h-72 overflow-hidden">
                <img src={story.img} alt={story.names} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-lg font-medium text-center">{story.story}</p>
                </div>
              </div>

              <div className="p-6 text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{story.names}</h2>
                <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {story.yearMet}</span>
                  <span className="flex items-center gap-1"><Info className="w-4 h-4" /> {story.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;