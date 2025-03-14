import PropTypes from "prop-types";

const CustomizedPlansPopup = ({ onClose }) => {
  const plans = [
    {
      id: 1,
      name: "Free Plan",
      price: "$0",
      features: [
        "Basic counseling sessions",
        "Access to community forums",
        "Limited resources",
      ],
      trial: "7-day free trial",
    },
    {
      id: 2,
      name: "Premium Plan",
      price: "$49/month",
      features: [
        "Unlimited counseling sessions",
        "Personalized counseling plans",
        "Priority support",
        "Access to premium resources",
      ],
      trial: "7-day free trial",
    },
    {
      id: 3,
      name: "Classic Plan",
      price: "$29/month",
      features: [
        "Weekly counseling sessions",
        "Email support",
        "Access to premium resources",
      ],
      trial: "7-day free trial",
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-5 w-full max-w-sm md:max-w-xl animate-fadeInRight">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-pink-700">Customized Plans</h2>
          <p className="text-gray-600 text-sm">
            Choose the perfect plan for your needs. All plans include a{" "}
            <span className="font-semibold text-pink-600">7-day free trial</span>.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white p-3 rounded-xl border border-pink-200 shadow-md text-center flex flex-col justify-between"
            >
              <h3 className="text-md font-semibold text-pink-700">{plan.name}</h3>
              <p className="text-xl font-bold text-gray-900">{plan.price}</p>

              <ul className="text-xs text-gray-700 space-y-1 mt-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-1 justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-pink-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-600 mt-2">{plan.trial}</p>

              <button
                onClick={() => alert(`You selected: ${plan.name}`)}
                className="mt-3 bg-pink-500 text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-pink-600 transition-all"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg text-xs hover:bg-gray-300 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

CustomizedPlansPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CustomizedPlansPopup;
