import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from "./axios"

function App() {
const [messages , setMessages] = useState([]);

  useEffect (() => {
       axios.get('/messages/sync').then((response) => {
         setMessages(response.data);
         
       }) 
  },[]);

 useEffect(() => {
  const pusher = new Pusher('6f1df3453deb4160a340', {
    cluster: 'ap2'
  });
  const channel = pusher.subscribe('messages');
  channel.bind('inserted',(newMessage) => {
    alert(JSON.stringify(newMessage));
    setMessages([...messages , newMessage])
  });

return() => {
    channel.unbind_all();
    channel.unsubscribe();
  }; 

 } , [messages]);

 console.log(messages);
  
  return (
    <div className="app">
      <div className="app_body">

 {/* Sidebar component */}
 <Sidebar/>

{/* Chat component */}
<Chat messages = {messages}/>
      </div>
    </div>
  );
}

export default App;
