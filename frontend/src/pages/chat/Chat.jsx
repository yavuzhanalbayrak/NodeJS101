import React from 'react'
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect('http://localhost:5000');

export const Chat = () => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const sendMessage = () => {
      socket.emit("chat", { message });
    };
    
    useEffect(() => {
      socket.on("chat", data => {
        setMessageReceived(data.message);
      });
    });
  return (
    <div className="App">
      
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}{}
    </div>
  )
}




