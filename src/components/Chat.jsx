import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/config";
import { useSelector } from "react-redux";

function Chat() {
  const user = useSelector((store) => store?.user?.data);
  const userId = user?._id;
  const firstName = user?.firstName;
  const { targetUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    if (!userId) return; // ✅ just return, not null

    const socket = createSocketConnection();

    if (socket && typeof socket.emit === "function") {
      socket.emit("joined", { userId, targetUserId });
    }

    socket.on("messageRecived", ({ text, userId, firstName }) => {
      console.log(text, "line no 29");
      setMessage((prev) => [...prev, { text, userId, firstName }]);
    });

    return () => {
      if (socket && typeof socket.disconnect === "function") {
        socket.disconnect();
      }
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      userId,
      targetUserId,
      text: newMessage,
      firstName,
    });
    setNewMessage("");
  };

  console.log(message, "line no 46");
  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[80vh] flex flex-col rounded-2xl shadow-lg bg-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-green-900 text-white">
          <h2 className="text-lg font-semibold">
            {message[0]?.firstName ? message[0]?.firstName : "Chat"}
          </h2>
          <span className="text-sm opacity-80">Online</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {message &&
            message.map((msg, index) => {
              console.log(msg, "line no 59");
              const isCurrentUser = msg.userId === userId;

              return (
                <div
                  key={index}
                  className={`flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      isCurrentUser
                        ? "bg-purple-900 text-white rounded-br-none"
                        : "bg-green-900 text-white rounded-bl-none"
                    }`}
                  >
                    {msg?.text}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Input area */}
        <div className="p-3 border-t border-gray-200 flex items-center gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Type a Message..."
            className="flex-1 border bg-white text-purple-700 border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
