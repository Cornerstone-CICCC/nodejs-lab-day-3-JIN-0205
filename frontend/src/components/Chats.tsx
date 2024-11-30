// Chats.jsx
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const Chats = () => {
  const [messages, setMessages]: any[] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("chat", (data) => {
      setMessages((prev: any) => [...prev, data]);
    });

    return () => {
      socket.off("chat");
    };
  }, []);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (username && message) {
      socket.emit("chat", { username, message });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((msg: any, index: number) => (
          <li key={index}>
            <strong>{msg.username}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
