import PropTypes from "prop-types";

const CertifiedCounselorsPopup = ({ onClose }) => {
  // Sample data for counselors (expanded list)
  const counselors = [
    {
      id: 1,
      name: "Dr. Emily Carter",
      rating: 4.8,
      cost: "$150/hr",
      contact: "+1 (555) 123-4567",
      location: "New York, USA",
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      rating: 4.9,
      cost: "$120/hr",
      contact: "+91 98765 43210",
      location: "Mumbai, India",
    },
    {
      id: 3,
      name: "Dr. Maria Gonzalez",
      rating: 4.7,
      cost: "$130/hr",
      contact: "+34 912 345 678",
      location: "Madrid, Spain",
    },
    {
      id: 4,
      name: "Dr. James Smith",
      rating: 4.6,
      cost: "$140/hr",
      contact: "+44 7911 123456",
      location: "London, UK",
    },
    {
      id: 5,
      name: "Dr. Sarah Johnson",
      rating: 4.9,
      cost: "$160/hr",
      contact: "+1 (555) 987-6543",
      location: "Los Angeles, USA",
    },
    {
      id: 6,
      name: "Dr. Ahmed Ali",
      rating: 4.7,
      cost: "$110/hr",
      contact: "+20 100 123 4567",
      location: "Cairo, Egypt",
    },
    {
      id: 7,
      name: "Dr. Mei Ling",
      rating: 4.8,
      cost: "$135/hr",
      contact: "+86 138 0013 8000",
      location: "Beijing, China",
    },
    {
      id: 8,
      name: "Dr. Carlos Mendez",
      rating: 4.6,
      cost: "$125/hr",
      contact: "+52 55 1234 5678",
      location: "Mexico City, Mexico",
    },
    {
      id: 9,
      name: "Dr. Anna Kowalski",
      rating: 4.9,
      cost: "$145/hr",
      contact: "+48 22 123 4567",
      location: "Warsaw, Poland",
    },
    {
      id: 10,
      name: "Dr. Hiroshi Tanaka",
      rating: 4.7,
      cost: "$155/hr",
      contact: "+81 90 1234 5678",
      location: "Tokyo, Japan",
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl animate-fadeInRight">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-pink-700 mb-4">
            Certified Counselors
          </h2>
          <p className="text-lg text-gray-600">
            Connect with our globally recognized marriage counselors. They are here to help you
            build a stronger, healthier relationship.
          </p>
        </div>

        {/* Global Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-pink-700">500+</p>
            <p className="text-sm text-gray-600">Happy Couples</p>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-blue-700">20+</p>
            <p className="text-sm text-gray-600">Countries</p>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-green-700">4.8/5</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-yellow-700">24/7</p>
            <p className="text-sm text-gray-600">Support</p>
          </div>
        </div>

        {/* Scrollable Counselors List */}
        <div className="max-h-[400px] overflow-y-auto pr-4">
          {counselors.map((counselor) => (
            <div
              key={counselor.id}
              className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-4 rounded-xl hover:shadow-lg transition-shadow duration-300 mb-4"
            >
              {/* Counselor Info */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-pink-700">
                    {counselor.name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold">{counselor.name}</p>
                  <p className="text-sm text-gray-600">{counselor.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(counselor.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.69h4.177c.969 0 1.371 1.24.588 1.81l-3.383 2.46a1 1 0 00-.364 1.118l1.286 3.953c.3.921-.755 1.688-1.54 1.118l-3.383-2.46a1 1 0 00-1.175 0l-3.383 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.953a1 1 0 00-.364-1.118L2.692 9.38c-.784-.57-.38-1.81.588-1.81h4.177a1 1 0 00.95-.69l1.286-3.953z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600">({counselor.rating})</span>
              </div>

              {/* Cost */}
              <p className="text-lg font-semibold text-pink-700">{counselor.cost}</p>

              {/* Contact Button */}
              <a
                href={`tel:${counselor.contact}`}
                className="bg-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-600 transition-all duration-300 text-sm"
              >
                Contact
              </a>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-300 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes validation
CertifiedCounselorsPopup.propTypes = {
  onClose: PropTypes.func.isRequired, // Validate that onClose is a function and is required
};

export default CertifiedCounselorsPopup;