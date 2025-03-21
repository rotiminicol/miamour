import { useState } from "react";
import { Header } from "../components/Header";
import { Bell, MessageCircle, Heart, CreditCard, Info, Check } from "lucide-react";
import PropTypes from 'prop-types';

const NotificationPage = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    messages: {
      email: true,
      push: true,
      sms: false
    },
    matches: {
      email: true,
      push: true,
      sms: false
    },
    systemUpdates: {
      email: true,
      push: false,
      sms: false
    },
    billing: {
      email: true,
      push: true,
      sms: true
    }
  });

  const handleToggle = (category, method) => {
    setNotificationSettings({
      ...notificationSettings,
      [category]: {
        ...notificationSettings[category],
        [method]: !notificationSettings[category][method]
      }
    });
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    // Here you would save to backend
    // For demo, just show success toast
    alert("Notification preferences saved successfully!");
  };

  const NotificationCategory = ({ title, icon, category }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-3 text-lg font-medium text-gray-800">{title}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Email</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={notificationSettings[category].email}
              onChange={() => handleToggle(category, 'email')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Push</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={notificationSettings[category].push}
              onChange={() => handleToggle(category, 'push')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">SMS</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={notificationSettings[category].sms}
              onChange={() => handleToggle(category, 'sms')}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-pink-500 to-pink-600">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Bell className="mr-2 h-6 w-6" />
                  Notification Settings
                </h2>
                <span className="px-3 py-1 text-xs font-medium bg-pink-200 text-pink-800 rounded-full">Personalize Your Experience</span>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Choose how youd like to be notified about activity on your account.
              </p>

              <form onSubmit={handleSavePreferences}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <NotificationCategory 
                    title="Messages" 
                    icon={<MessageCircle className="h-5 w-5 text-pink-500" />}
                    category="messages" 
                  />
                  
                  <NotificationCategory 
                    title="Matches" 
                    icon={<Heart className="h-5 w-5 text-pink-500" />}
                    category="matches" 
                  />
                  
                  <NotificationCategory 
                    title="System Updates" 
                    icon={<Info className="h-5 w-5 text-pink-500" />}
                    category="systemUpdates" 
                  />
                  
                  <NotificationCategory 
                    title="Billing Alerts" 
                    icon={<CreditCard className="h-5 w-5 text-pink-500" />}
                    category="billing" 
                  />
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                    onClick={() => {
                      // Reset all to default
                      setNotificationSettings({
                        messages: { email: true, push: true, sms: false },
                        matches: { email: true, push: true, sms: false },
                        systemUpdates: { email: true, push: false, sms: false },
                        billing: { email: true, push: true, sms: true }
                      });
                    }}
                  >
                    Reset to Defaults
                  </button>
                  
                  <button
                    type="submit"
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NotificationPage.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
	category: PropTypes.string.isRequired,
 };

export default NotificationPage;