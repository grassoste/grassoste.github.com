import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ChatbotIntroBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 30000); // Disappear after 30 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-blue-500 text-white p-3 rounded-lg shadow-lg max-w-xs animate-fade-in-up">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-1 text-white hover:text-gray-200"
        aria-label="Close banner"
      >
        <X size={16} />
      </button>
      <p className="text-sm font-medium">Ask anything about Stefano and get your reply within seconds!</p>
    </div>
  );
};

export default ChatbotIntroBanner;