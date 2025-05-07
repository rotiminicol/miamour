import { Heart, UserSearch, Calendar, Users, MessageCircleHeart } from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Single feature card (static, no animation)
 */
const Feature = ({ icon, title, description }) => (
  <div className="card p-8 flex flex-col items-center text-center bg-white rounded-lg shadow hover:shadow-md transition-shadow">
    <div className="mb-4 p-4 bg-primary-50 rounded-full">
      {icon}
    </div>
    <h3 className="text-xl font-serif font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

Feature.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Features = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8 text-primary-500" />,
      title: 'Smart Matching',
      description: 'Our proprietary algorithm ensures compatible matches based on your preferences and personality.',
    },
    {
      icon: <UserSearch className="h-8 w-8 text-primary-500" />,
      title: 'Verified Profiles',
      description: 'All profiles are verified to ensure you connect with genuine, like-minded individuals.',
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary-500" />,
      title: 'Event Planning',
      description: 'From first date to wedding day, we provide tools to celebrate every milestone in your your journey.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary-500" />,
      title: 'Success Stories',
      description: 'Join thousands of happy couples who found their soulmates through our platform.',
    },
    {
      icon: <MessageCircleHeart className="h-8 w-8 text-primary-500" />,
      title: 'Relationship Coaching',
      description: 'Access to expert advice and guidance to nurture your relationship to its full potential.',
    },
  ];

  return (
    <section id="features" className="section bg-gray-50 py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-serif font-bold text-4xl mb-4 text-secondary-800">
            Why Choose <span className="text-primary-500">Miamour</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform offers more than just matches; we create meaningful connections that last a lifetime.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;