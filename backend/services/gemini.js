
const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");
const ConversationMessage = require('../model/Session');
const { param } = require("../routers/chatRouter");

require('dotenv').config();
const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const get_rooms = {
  "name": "get_rooms",
  "description": "find hotel rooms",
  "parameters": {
    "type": "object",
    "properties": {
      "hotel": {
        "type": "string",
        "description": "Hotel name"
      }
    }  
  },
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  // tools:{
  //   functionDeclarations: [get_rooms],
  // },
    // toolConfig:{
    //   functionCallingConfig:{
    //     mode: "ANY",
    //     allowedFunctionNames: ["get_rooms", "show rooms", "list rooms", "available rooms"]
    //   }
    // }    
  // tools:[get_room_options],
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
  
  async function Chat(message , sessionId = false) {

    // const history = await ConversationMessage.findAll({
    //     where: {
    //         sessionId
    //     },
    //     attributes: ['message', 'isUserMessage'],
    //     orderBy: [['createdAt', 'ASC']]
    // });

    let historyy = [];

    // history.forEach((msg) => {
    //     if(msg.isUserMessage){
    //         historyy.push({
    //             role: "user",
    //             parts: [
    //                 {text: msg.message}
    //             ]
    //         });
    //     }
    //     else{
    //         historyy.push({
    //             role: "model",
    //             parts: [
    //                 {text: msg.message}
    //             ]
    //         });
    //     }
    // });

    const hotelRooms = await fetch(`https://bot9assignement.deno.dev/rooms`).then(res => res.json());

    // See https://ai.google.dev/gemini-api/docs/safety-settings
    const chatSession =  model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: `You are Bot 9, an AI assistant designed to help users with hotel booking. Your primary role is to assist users by providing accurate information here are the details of the hotel rooms ${hotelRooms}`},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Understood! You can now ask me anything related to hotel bookings. I'll do my best to be your helpful and informative AI assistant, Bot 9. How can I help you today?"},
          ],
        },
        ...historyy,
      ]
    });
    
    const response = await chatSession.sendMessage(message);

    // const result = await response.sendMessage(message);
    // console.log("basic reaponse",response.response.candidates[0].content.parts[0].functionCall);
    // console.log("basic reaponse",response.response.text());

    console.log("respome is tis" , response.response.text());

    return response.response.text();
    }
  
  module.exports = Chat;

  // const functionCall = response.response.functionCalls[0];
  // // console.log("functiona calling" , call);
  // if(response.response.functionCalls.length > 0){

  //   const { name, parameters } = functionCall;

  //   console.log("functiona calling" , name);
  //   console.log("functiona calling" , parameters);

  //   const apiResoponse = await fetch(`https://bot9assignement.deno.dev/rooms`);
  //   const data = await apiResoponse.json();
    
  //   const result2 = await response.sendMessage([{functionResponse : {
  //       name: "get_room_options",
  //       response: {
  //         rooms: data
  //       },
  //   }}]);

  //   console.log("functiona calling" , result2.response.text());