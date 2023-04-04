import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const SendMessage = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("message", { message });
    setMessage("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Message</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default SendMessage;
