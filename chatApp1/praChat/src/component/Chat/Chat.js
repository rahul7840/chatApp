import React, { useEffect, useState } from 'react'
import { user } from "../Join/Join.js";
import socketIO from "socket.io-client"
import './Chat.css';
import sendLogo from "../../image/send.png"
import Message from "../message/Message"
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../image/closeIcon.png"

const ENDPOINT = 'http://localhost:4000/';
let socket;



const Chat = () => {

    const [id, setid] = useState("")
    const [messages, setMessages] = useState([])



    // given below code for sneding message ane maknig null value in textpad
    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";

    }


    console.log(messages);
    useEffect(() => {

        socket = socketIO(ENDPOINT, { transports: ['websocket'] });


        socket.on('connect', () => {
            // alert("connected");
            setid(socket.id);
        })

        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages,data]);
            console.log(data.user, data.message)
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages,data]);
            console.log(data.user, data.message)
        })

        socket.on('leave', (data) => {
            setMessages([...messages,data]);
            console.log(data.user, data.message)
        })

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [])


   console.log(messages); 
    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages,data]);
            console.log(data.user, data.message, data.id);
        })

        return () => {
            socket.off();
        }
    }, [messages])






    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='header'>
                    <h2>NEOchat</h2>
                    <a href="/"><img src={closeIcon} alt="Close" /></a>
                </div>

                <ReactScrollToBottom className='chatBox'>
                    {messages.map((item, i ) => <Message user={item.id===id? '':item.user} message={item.message} classs={item.id===id?'right':'left'}/> )}
                </ReactScrollToBottom>


                <div className='inputBox'>
                    <input onKeyPress={(event)=>event.key === 'Enter'? send(): null} type="text" id="chatInput" />
                    <button onClick={send} className='sendBtn'><img src={sendLogo} alt="send" /></button>
                </div>

            </div>
        </div>
    )
}

export default Chat;