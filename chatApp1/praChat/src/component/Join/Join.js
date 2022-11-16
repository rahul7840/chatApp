import React, { useState } from 'react'
import "./Join.css"
import logo from "../../image/logo.png"
import { Link } from 'react-router-dom';

let user;

const Join = () => {

   const [name, setname] = useState("");
   console.log(name);
   

  const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value="";

  }

  return (
    <div className='Joinpage'>
      <div className='JoinContainer'>
        <img src={logo} alt="logo" />
        <h1>neoChat</h1>
        <input onChange={(e)=>setname(e.target.value)} placeholder='USER NAME' type="text" id="joinInput" />
        <Link onClick={(event)=> !name ?event.preventDefault():null} to="/chat">
        <button onClick={sendUser} className='joinbtn'>login</button>
        </Link>
      </div>
    </div>
  );

}

export default Join;
export {user};