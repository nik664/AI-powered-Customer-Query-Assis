import React, { useState, useRef } from 'react';
import axios from 'axios';
import ChatBox from './components/ChatBox';
import './styles/App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const recognitionRef = useRef(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: input
      });
      const botMessage = { text: response.data.message, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'Something went wrong.', sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    }

    setInput('');
  };

  const handleSpeech = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };
    }

    recognitionRef.current.start();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🎙️ AI Chatbox Assistant</h1>

      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-xl flex flex-col p-4">
        <ChatBox messages={messages} />

        <div className="flex mt-4 gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message or use voice..."
            className="flex-1 p-3 rounded-xl text-black outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSpeech}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl"
          >
            🎤
          </button>
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
