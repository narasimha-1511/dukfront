import React, { useRef, useState } from "react";
import "./css/chatbox.css";
import getResponse from "../utils/api";

const ChatBox = () => {
  const animation = useRef(null);
  const chatBox = useRef(null);
  const [chatStarted, setChatStarted] = useState(false);
  const [leetcodeUrl, setLeetCodeUrl] = useState("");
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    animation.current.style.display = "block";

    if (chatStarted) {
      if (userInput === "") {
        animation.current.style.display = "none";
        return;
      }

      setUserInput("");
      addMessage(userInput);

      await getResponse(userInput).then((data) => {
        console.log(data, "response data");
        addMessage(data.data, true);
        animation.current.style.display = "none";
        return;
      });
    } else {
      setChatStarted(true);

      const userMessage = userInput;
      setUserInput("");
      addMessage(userMessage);

      await getSessionStarted().then((data) => {
        localStorage.setItem("sessionId", data.sessionId);
        console.log(data);
      });

      const response = await getResponse(userMessage);

      console.log(response, "response data");
      addMessage(response.data, true);
      animation.current.style.display = "none";
    }
  };

  return (
    <div className="chat-container">
      <div ref={chatBox} className="chat-messages">
        <div className="message bot-message">Hello, how can I assist you?</div>
      </div>
      <div ref={animation} id="loading-animation" style={{ display: "none" }}>
        <div id="loader"></div>
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          id="user-input"
          placeholder="Reply ..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button id="send-button" onClick={handleSubmit}>
          Send
        </button>
      </form>
    </div>
  );

  function addMessage(message, isBot = false) {
    if (isBot) {
      let botMessage = document.createElement("div");
      botMessage.classList.add("message");
      botMessage.classList.add("bot-message");

      let botMessageContent = document.createElement("pre");
      botMessageContent.innerHTML = message;
      botMessage.appendChild(botMessageContent);
      chatBox.current.appendChild(botMessage);
    } else {
      let userMessage = document.createElement("div");
      userMessage.classList.add("message");
      userMessage.classList.add("user-message");

      userMessage.innerHTML = message;
      chatBox.current.appendChild(userMessage);
    }
    window.scrollTo(0, document.body.scrollHeight);
  }

  async function getSessionStarted() {
    return fetch("https://dukfront.onrender.com/chat/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("sessionId", data.sessionId);
        return data;
      });
  }
};

export default ChatBox;
