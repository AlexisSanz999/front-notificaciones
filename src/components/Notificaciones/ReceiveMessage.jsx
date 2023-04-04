import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import io from "socket.io-client";

const socket = io("http://192.168.100.2:5000/");

const ReceiveMessage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("response", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  return (
    <ListGroup>
      {messages.map((message, index) => (
        <ListGroup.Item key={index}>{message}</ListGroup.Item>
      ))}
    </ListGroup>
    
  );
};

export default ReceiveMessage;
