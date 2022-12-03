import React, { useState } from "react";
import "./Join.css";
import logo from "../../images/whatsapp.svg";
import { Link } from "react-router-dom";

let user;

const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};

const Join = () => {
  const [name, setName] = useState();
  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>CHAT APP</h1>
        <input
          type="text"
          id="joinInput"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          // value={name}
        />
        <Link
          onClick={(e) => (!name ? e.preventDefault() : null)}
          to="/chat"
        >
          <button className="joinbtn" onClick={sendUser}>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
