import React, { useEffect } from "react";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import { useState } from "react";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let socket;

const ENDPOINT = "http://localhost:4500";

const Chat = () => {
  // console.log(user);
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  // console.log(messages);

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      toast.success("connected");
      setId(socket.id);
    });
    // console.log(socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      // console.log(data);
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message, data.id, "sendMessageeeeeee");
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        icon={false}
      />
      <div className="chatContainer">
        <div className="header">
          <h2>Chat App</h2>
          <a href="/">
            <img src={closeIcon} alt="" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages?.map((item, index) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
              key={index}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input type="text" id="chatInput" onKeyPress={(e) => e.key === "Enter" ? send() : null}/>
          <button className="sendBtn" onClick={send}>
            <img src={sendLogo} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
