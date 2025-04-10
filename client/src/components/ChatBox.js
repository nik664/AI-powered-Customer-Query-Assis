import React from 'react';

function ChatBox({ messages }) {
  return (
    <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto px-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-3 rounded-xl max-w-[80%] ${
            msg.sender === 'user'
              ? 'bg-blue-500 self-end text-white'
              : 'bg-gray-700 self-start text-white'
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}

export default ChatBox;
