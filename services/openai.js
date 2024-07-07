const OpenAI = require("openai");
const ConversationMessage = require("../model/Session");

require("dotenv").config();
const openai = new OpenAI({
  baseURL: "http://jamsapi.hackclub.dev/openai",
  apiKey: process.env.GOOGLE_API_KEY,
});

async function get_room_options() {
  const data = await fetch(`https://bot9assignement.deno.dev/rooms`);
  const res = await data.json();
  return JSON.stringify(res);
}

const book_room = async ({ roomId, fullName, email, nights }) => {
  try {
    const response = await fetch(`https://bot9assignement.deno.dev/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId,
        fullName,
        email,
        nights,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return JSON.stringify(data);
  } catch (error) {
    console.error("Error booking room:", error);
  }
};

async function runConversation(message, sessionId) {
  const messagess = await ConversationMessage.findAll({
    where: {
      sessionId,
    },
    orderBy: ["createdAt", "ASC"],
  });

  // Step 1: send the conversation and available functions to the model
  const messages = [
    {
      role: "user",
      content:
        "You are Bot 9, an AI assistant designed to help users with hotel booking. Your primary role is to assist users by providing accurate information.",
    },
  ];

  messagess.map((message) => {
    messages.push({
      role: message.isUserMessage ? "user" : "assistant",
      content: message.message,
    });
  });

  messages.push({
    role: "user",
    content: message,
  });

  console.log(messages);

  const tools = [
    {
      type: "function",
      name: "get_room_options",
      description: "Get the available rooms in the hotel.",
      parameters: {},
    },
    {
      type: "function",
      name: "book_room",
      description: "To post room details after successful booking",
      parameters: {
        type: "object",
        properties: {
          roomId: {
            type: "integer",
            description: "ID of the room being booked",
          },
          fullName: {
            type: "string",
            description: "Full name of the person booking the room",
          },
          email: {
            type: "string",
            description: "Email address of the person booking the room",
          },
          nights: {
            type: "number",
            description: "Number of nights the room is booked for",
          },
        },
        required: ["roomId", "fullName", "email", "nights"],
      },
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    functions: tools,
    function_call: "auto", // auto is default, but we'll be explicit
  });

  const responseMessage = response.choices[0].message;
  console.log(response.choices[0].message);
  console.log("this is the content recceived", responseMessage.content);

  if (responseMessage.content !== null) {
    return responseMessage.content;
  }

  // Step 2: check if the model wanted to call a function
  const toolCalls = responseMessage.function_call
    ? [responseMessage.function_call]
    : [];

  if (toolCalls.length > 0) {
    const availableFunctions = {
      get_room_options: get_room_options,
      book_room: book_room,
    };

    messages.push(responseMessage);

    for (const toolCall of toolCalls) {
      const functionName = toolCall.name;
      const functionToCall = availableFunctions[functionName];
      const functionArgs = JSON.parse(toolCall.arguments);
      const functionResponse = await functionToCall(functionArgs);
      messages.push({
        role: "function",
        name: functionName,
        content: functionResponse,
      }); // extend conversation with function response
    }

    const secondResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
    }); // get a new response from the model where it can see the function response
    console.log(secondResponse);
    return secondResponse.choices;
  }
}

// runConversation().then(console.log).catch(console.error);

module.exports = runConversation;
