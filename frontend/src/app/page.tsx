'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Flag, Zap, MessageSquare } from 'lucide-react';
import { ChatMessage, RACING_THEME } from '@/lib/config';
import { chatAPI } from '@/lib/api';
import { RaceTrackLoading } from '@/components/RacingComponents';

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHealthy, setIsHealthy] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check API health on mount
  useEffect(() => {
    const checkHealth = async () => {
      const healthy = await chatAPI.checkHealth();
      setIsHealthy(healthy);
    };
    checkHealth();
  }, []);

  useEffect(() => {
    // Add welcome message
    setMessages([{
      id: '1',
      type: 'bot',
      content: RACING_THEME.MESSAGES.WELCOME,
      timestamp: new Date()
    }]);
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatAPI.sendMessage(currentInput);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: RACING_THEME.MESSAGES.ERROR,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <Flag className="w-8 h-8 text-yellow-400 animate-pulse" />
            <h1 className="text-3xl font-bold text-white">NASCAR ChatBot</h1>
            <Zap className="w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
          <p className="text-center text-red-100 mt-2">Your AI Pit Crew Chief</p>
          
          {/* API Status Indicator */}
          <div className="flex items-center justify-center mt-2 space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-red-100">
              API {isHealthy ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        {/* Racing stripe decoration */}
        <div className="h-2 bg-gradient-to-r from-yellow-400 via-white to-yellow-400"></div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-170px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto chat-scroll bg-gray-800/50 rounded-xl p-4 mb-4 backdrop-blur-sm border border-gray-700">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-3 shadow-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                      : 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 border border-yellow-500/30'
                  }`}
                >
                  {message.type === 'bot' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Flag className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold text-sm">NASCAR Bot</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 rounded-lg px-4 py-3 shadow-lg border border-yellow-500/30">
                  <div className="flex items-center space-x-2">
                    <Flag className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-sm">NASCAR Bot</span>
                  </div>
                  <RaceTrackLoading message={RACING_THEME.MESSAGES.LOADING} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-gray-800/70 rounded-xl p-4 backdrop-blur-sm border border-gray-700">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={RACING_THEME.MESSAGES.PLACEHOLDER}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 border border-gray-600"
                rows={2}
                disabled={isLoading || !isHealthy}
              />
              <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading || !isHealthy}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg px-6 py-3 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 racing-pulse"
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </button>
          </div>
          <div className="flex items-center justify-center mt-3 space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>{isHealthy ? 'Ready to race' : 'Pit stop needed'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Flag className="w-4 h-4 text-yellow-400" />
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Racing-themed decorative elements */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 opacity-50"></div>
    </div>
  );
}
