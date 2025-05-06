import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMatchStore from '../store/matchStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Loader2, Edit2, ChevronLeft, ChevronRight, Star, Info, Check, Clock, UserPlus, MessageSquare } from 'lucide-react';

const MatchTrack = () => {
  const navigate = useNavigate();
  const { 
    matchCard, 
    potentialMatches, 
    loading, 
    error, 
    fetchMatchCard, 
    fetchPotentialMatches, 
    acceptMatch, 
    rejectMatch,
    updateMatchCard
  } = useMatchStore();
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    age: '',
    location: '',
    profession: '',
    education: '',
    religion: ''
  });
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [matchStatus, setMatchStatus] = useState('searching'); // 'searching', 'found', 'matched'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchMatchCard();
    fetchPotentialMatches();
    
    // Simulate matching progress
    if (matchCard?.status === 'active') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setMatchStatus('found');
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [fetchMatchCard, fetchPotentialMatches, matchCard?.status]);

  const handleEdit = () => {
    setEditForm({
      name: matchCard.name || '',
      age: matchCard.age || '',
      location: matchCard.location || '',
      profession: matchCard.profession || '',
      education: matchCard.education || '',
      religion: matchCard.religion || ''
    });
    setEditDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMatchCard(editForm);
      setEditDialogOpen(false);
      fetchMatchCard(); // Refresh the match card
    } catch (error) {
      console.error('Error updating match card:', error);
    }
  };

  const handleMatchAction = async (matchId, action) => {
    try {
      if (action === 'accept') {
        await acceptMatch(matchId);
        setMatchStatus('matched');
      } else {
        await rejectMatch(matchId);
        setCurrentMatchIndex(prev => (prev + 1) % potentialMatches.length);
      }
    } catch (error) {
      console.error(`Error ${action}ing match:`, error);
    }
  };

  const handleNextMatch = () => {
    setCurrentMatchIndex(prev => (prev + 1) % potentialMatches.length);
  };

  const handlePrevMatch = () => {
    setCurrentMatchIndex(prev => (prev - 1 + potentialMatches.length) % potentialMatches.length);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-pink-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-pink-600 hover:text-pink-700"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Home
          </button>
          <h1 className="text-2xl font-bold text-pink-600">Match Track</h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Your Match Card */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
            {matchCard && (
              <button
                onClick={handleEdit}
                className="flex items-center px-4 py-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
          
          {matchCard ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/3">
                    <div className="relative pb-[100%] rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={matchCard.images?.[0] || '/default-avatar.png'}
                        alt={matchCard.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{matchCard.name}</h3>
                        <p className="text-gray-600">{matchCard.age} years old</p>
                      </div>
                      <div className="flex items-center bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                        <Star className="w-4 h-4 mr-1" />
                        Premium Member
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="font-medium">{matchCard.location}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Profession</p>
                        <p className="font-medium">{matchCard.profession}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Education</p>
                        <p className="font-medium">{matchCard.education}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Religion</p>
                        <p className="font-medium">{matchCard.religion}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="flex-1 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        View Messages
                      </button>
                      <button className="flex-1 py-2 bg-white border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors">
                        Share Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <UserPlus className="w-10 h-10 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Your Profile</h3>
                <p className="text-gray-600 mb-6">Create your match card to start finding compatible partners</p>
                <button
                  onClick={() => navigate('/getting-started')}
                  className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 font-medium"
                >
                  Create Match Card
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Matching Status */}
        {matchCard && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Matching Status</h2>
            
            {matchStatus === 'searching' && (
              <motion.div 
                className="bg-white rounded-xl shadow-lg overflow-hidden p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Finding Your Matches</h3>
                    <p className="text-gray-600">Were searching for compatible partners based on your preferences</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div 
                      className="bg-pink-600 h-2.5 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center mt-6">
                  <div className="p-3 bg-pink-50 rounded-lg">
                    <div className="text-pink-600 font-bold text-xl mb-1">{potentialMatches.length}</div>
                    <div className="text-gray-600 text-sm">Potential Matches</div>
                  </div>
                  <div className="p-3 bg-pink-50 rounded-lg">
                    <div className="text-pink-600 font-bold text-xl mb-1">24</div>
                    <div className="text-gray-600 text-sm">Viewed Your Profile</div>
                  </div>
                  <div className="p-3 bg-pink-50 rounded-lg">
                    <div className="text-pink-600 font-bold text-xl mb-1">5</div>
                    <div className="text-gray-600 text-sm">Liked You</div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {matchStatus === 'found' && (
              <motion.div 
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="p-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
                  <div className="flex items-center">
                    <Check className="w-6 h-6 mr-3" />
                    <h3 className="text-xl font-semibold">We Found Potential Matches!</h3>
                  </div>
                  <p className="mt-2 opacity-90">Review your matches below and connect with someone special</p>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-medium text-gray-900">Your Top Matches</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">1 of {potentialMatches.length}</span>
                      <button 
                        onClick={handlePrevMatch}
                        className="p-1 rounded-full hover:bg-gray-100 mr-1"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={handleNextMatch}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {matchStatus === 'matched' && (
              <motion.div 
                className="bg-white rounded-xl shadow-lg overflow-hidden p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Youve Made a Connection!</h3>
                    <p className="text-gray-600">Start chatting with your match and get to know each other</p>
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <button className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 font-medium">
                    Send Message
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Potential Matches */}
        {matchCard && potentialMatches.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Potential Matches</h2>
            
            <div className="relative">
              {potentialMatches.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevMatch}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-100"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button 
                    onClick={handleNextMatch}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-100"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={potentialMatches[currentMatchIndex]?._id || 'empty'}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {potentialMatches[currentMatchIndex] && (
                    <>
                      <div className="relative h-80 md:h-96">
                        <img
                          src={potentialMatches[currentMatchIndex].images[0] || '/default-avatar.png'}
                          alt={potentialMatches[currentMatchIndex].name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white">
                          <h3 className="text-2xl font-bold">{potentialMatches[currentMatchIndex].name}</h3>
                          <p className="text-lg">{potentialMatches[currentMatchIndex].age} years old</p>
                          <div className="flex items-center mt-2">
                            <svg className="w-4 h-4 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm">4.8 (89% match)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="font-medium">{potentialMatches[currentMatchIndex].location}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Profession</p>
                            <p className="font-medium">{potentialMatches[currentMatchIndex].profession}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Education</p>
                            <p className="font-medium">{potentialMatches[currentMatchIndex].education}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Religion</p>
                            <p className="font-medium">{potentialMatches[currentMatchIndex].religion}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <button
                            onClick={() => handleMatchAction(potentialMatches[currentMatchIndex]._id, 'reject')}
                            className="flex-1 mr-3 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                          >
                            <X className="w-5 h-5 mr-2" />
                            Pass
                          </button>
                          <button
                            onClick={() => handleMatchAction(potentialMatches[currentMatchIndex]._id, 'accept')}
                            className="flex-1 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center justify-center"
                          >
                            <Heart className="w-5 h-5 mr-2" />
                            Like
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="mt-6 flex justify-center space-x-2">
              {potentialMatches.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMatchIndex(index)}
                  className={`w-3 h-3 rounded-full ${currentMatchIndex === index ? 'bg-pink-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Matches State */}
        {matchCard && potentialMatches.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                <Info className="w-10 h-10 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Matches Found Yet</h3>
              <p className="text-gray-600 mb-6">Were still searching for compatible partners based on your preferences. Check back later or consider adjusting your criteria.</p>
              <button
                onClick={() => navigate('/preferences')}
                className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 font-medium"
              >
                Edit Preferences
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Edit Dialog */}
      <AnimatePresence>
        {editDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Edit Your Profile</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={editForm.age}
                      onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                    <input
                      type="text"
                      value={editForm.profession}
                      onChange={(e) => setEditForm({ ...editForm, profession: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                    <input
                      type="text"
                      value={editForm.education}
                      onChange={(e) => setEditForm({ ...editForm, education: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                    <input
                      type="text"
                      value={editForm.religion}
                      onChange={(e) => setEditForm({ ...editForm, religion: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditDialogOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchTrack;