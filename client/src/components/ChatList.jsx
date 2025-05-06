import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useChatStore from '../store/chatStore';
import useMatchStore from '../store/matchStore';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Heart, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const ChatList = () => {
  const navigate = useNavigate();
  const { chats, loading, error, fetchChats } = useChatStore();
  const { matchCard } = useMatchStore();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <Heart className="w-16 h-16 text-pink-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Chats Yet</h3>
        {!matchCard ? (
          <>
            <p className="text-gray-600 mb-4">
              Complete your profile to start matching with others!
            </p>
            <button
              onClick={() => navigate('/getting-started')}
              className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              Complete Profile
            </button>
          </>
        ) : (
          <p className="text-gray-600">
            When you match with someone, you'll be able to chat with them here.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <AnimatePresence>
        {chats.map((chat) => (
          <motion.div
            key={chat._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            className="p-4 border-b cursor-pointer hover:bg-gray-50"
            onClick={() => handleChatClick(chat._id)}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={chat.participant.images[0] || '/default-avatar.png'}
                  alt={chat.participant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {chat.participant.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {chat.participant.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {format(new Date(chat.lastMessage?.createdAt || chat.createdAt), 'h:mm a')}
                  </p>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage?.content || 'Start a conversation!'}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ChatList; 