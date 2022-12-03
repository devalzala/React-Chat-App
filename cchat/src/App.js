import React from "react";
import socketIO from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./component/Join/Join";
import "./App.css";
import Chat from "./component/Chat/Chat";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
