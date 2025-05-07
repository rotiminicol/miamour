import { useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { Calendar, Clock, User, ChevronLeft, X, Edit2 } from 'lucide-react';

const SchedulePage = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      counselor: 'Dr. Sarah Johnson',
      date: '2025-05-10',
      time: '10:00 AM',
      type: 'Communication Coaching',
      status: 'Confirmed',
      notes: 'Focus on active listening techniques'
    },
    {
      id: 2,
      counselor: 'Dr. Michael Chen',
      date: '2025-05-12',
      time: '2:00 PM',
      type: 'Trust Building',
      status: 'Pending',
      notes: 'Discuss trust issues from past conflicts'
    }
  ]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ date: '', time: '', notes: '' });
  const [screenSize, setScreenSize] = useState('desktop');

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 300], [0, 100]);
  const scheduleParallax = useTransform(scrollY, [300, 600], [0, 50]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth < 768 ? 'mobile' : 'desktop');
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === selectedAppointment.id
          ? { ...apt, ...editData }
          : apt
      )
    );
    setEditMode(false);
    setSelectedAppointment(null);
  };

  const handleCancelAppointment = (id) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
    setSelectedAppointment(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-pink-100 hover:bg-pink-50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-pink-600 group-hover:text-pink-700" />
          <span className="text-sm font-medium text-pink-600 group-hover:text-pink-700">Back</span>
        </button>
      </div>

      <div className="relative bg-gradient-to-br from-pink-50 to-white text-gray-800 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><path d='M30 0C13.431 0 0 13.431 0 30s13.431 30 30 30 30-13.431 30-30S46.569 0 30 0zm0 54C16.745 54 6 43.255 6 30S16.745 6 30 6s24 10.745 24 24-10.745 24-24 24zm0-48C14.327 6 6 14.327 6 30s8.327 24 24 24 24-8.327 24-24S45.673 6 30 6z' fill='%23EC4899' fill-opacity='0.3' fill-rule='evenodd'/></svg>")`,
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <div style={{ transform: `translateY(${heroParallax.get()}px)` }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-gray-900">
              Your <span className="text-pink-600">Schedule</span>
            </h1>
            <p className="text-lg md:text-xl mb-12 text-gray-600 max-w-2xl mx-auto">
              Manage your counseling appointments and stay on track with your relationship goals.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div style={{ transform: `translateY(${scheduleParallax.get()}px)` }} className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-center mb-12 text-gray-900">Upcoming Appointments</h2>
          {appointments.length === 0 ? (
            <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-pink-100">
              <p className="text-gray-600 mb-4">No appointments scheduled yet.</p>
              <button
                onClick={() => window.location.href = '/marriage-counseling'}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700"
              >
                Book a Session
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map(appointment => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-xl border border-pink-100 p-6 hover:shadow-lg cursor-pointer"
                  onClick={() => setSelectedAppointment(appointment)}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{appointment.counselor}</h3>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        appointment.status === 'Confirmed'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2 text-pink-500" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2 text-pink-500" />
                      {appointment.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <User className="w-5 h-5 mr-2 text-pink-500" />
                      {appointment.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedAppointment && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => { setSelectedAppointment(null); setEditMode(false); }}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Appointment Details</h2>
              <button
                onClick={() => { setSelectedAppointment(null); setEditMode(false); }}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {editMode ? (
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      name="date"
                      value={editData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="time"
                      name="time"
                      value={editData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    name="notes"
                    value={editData.notes}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows="3"
                    placeholder="Additional notes for the session"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-pink-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{selectedAppointment.counselor}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2 text-pink-500" />
                      {selectedAppointment.date}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2 text-pink-500" />
                      {selectedAppointment.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <User className="w-5 h-5 mr-2 text-pink-500" />
                      {selectedAppointment.type}
                    </div>
                    <div className="flex items-start text-gray-600">
                      <div className="w-5 h-5 mr-2 text-pink-500">📝</div>
                      {selectedAppointment.notes}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setEditMode(true);
                      setEditData({
                        date: selectedAppointment.date,
                        time: selectedAppointment.time,
                        notes: selectedAppointment.notes
                      });
                    }}
                    className="flex items-center gap-2 px-6 py-2 border border-pink-100 rounded-lg hover:bg-pink-50 text-pink-600"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleCancelAppointment(selectedAppointment.id)}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {screenSize === 'mobile' && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            className="bg-pink-600 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-pink-700"
            aria-label="Book New Appointment"
            onClick={() => window.location.href = '/marriage-counseling'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;