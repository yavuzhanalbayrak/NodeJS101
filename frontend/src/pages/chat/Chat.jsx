import React from 'react'
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect('http://localhost:5000');

export const Chat = () => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        socket.emit('chat', {
            message: message,
            sender: socket.id
        }); 
    };
    
    useEffect(() => {
        const output = document.getElementById('output');
    
        socket.on("chat", data => {
            output.innerHTML += '<p> <strong>'+data.sender.substring(0,3)+'...</strong> : '+data.message+'</p>';
            
        });
    
        return () => {
            socket.off("chat");
        };
    }, []); 
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
      <div id='output'></div>
      
      
    </div>
  )
}




