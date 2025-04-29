'use client'
import React, { useState, useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const phoneNumber = '+917406056678'; // Replace with your actual WhatsApp number
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Encode the message for the URL
      const encodedMessage = encodeURIComponent(message);
      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      setIsOpen(false);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-blue-500 p-4 flex justify-between items-center">
            <div className="text-white">
              <h3 className="font-medium">uniview Iran</h3>
              <div className="flex items-center text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Online - Ready to chat
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="bg-gray-800 p-4 h-80 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-gray-700 text-white p-3 rounded-lg inline-block mb-2">
                Hello! How can we help you today? 👋
                <div className="text-xs text-gray-400 mt-1">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="bg-gray-600 p-3 rounded-lg">
                <input 
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message and press Enter."
                  className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
                />
              </div>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 
          text-white p-4 rounded-full shadow-lg hover:shadow-xl 
          transform hover:scale-110 transition-all duration-300 
          animate-bounce hover:animate-none"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={30} />
      </button>
    </>
  );
};

export default WhatsAppIcon; 