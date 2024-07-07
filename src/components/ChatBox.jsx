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

      addMessage(userInput);

      getResponse(userInput).then((data) => {
        addBotMessageToHistory(data);
        addMessage(data, true);
        animation.current.style.display = "none";
        return;
      });

      setUserInput("");
    } else {
      setChatStarted(true);

      const userMessage = userInput;
      setUserInput("");

      await getSessionStarted().then((data) => {
        console.log(data);
        addUserMessageToHistory(data);
        addMessage(data, true);
        animation.current.style.display = "none";
      });

      const response = await getResponse(userMessage);
      console.log(response, "repsondee for m");

      addBotMessageToHistory(response.data);
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
        <button id="send-button" onClick={handleSubmit}>Send</button>
      </form>
    </div>
  );

  function addUserMessageToHistory(question, doubt, formIT = false) {
    const message = `\"Here is the LeetCode question along with the doubt I have:\n\n${question}\n\n${doubt}\"`;
    let newHistory = history;
    newHistory.push({
      role: "user",
      parts: [{ text: formIT ? doubt : message }],
    });
    setHistory(newHistory);
    localStorage.setItem("geminiHistory", JSON.stringify(newHistory));
  }

  function addBotMessageToHistory(message) {
    let newHistory = history;
    newHistory.push({
      role: "model",
      parts: [{ text: message }],
    });
    setHistory(newHistory);
    localStorage.setItem("geminiHistory", JSON.stringify(newHistory));
  }

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
    
    return  fetch("http://localhost:3000/chat/session", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      })
      .then((response) => response.json())
      .then((data) => {
          return data;
      })
};
};

export default ChatBox;
