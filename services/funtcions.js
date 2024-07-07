// functions.js
const functions = [
    {
      "name": "get_room_options",
      "description": "Fetches a list of available hotel rooms for the given location and date range",
      "parameters": {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "description": "The unique identifier of the hotel location"
          },
          "description": {
            "type": "string",
            "description": "The description of the room offered by the hotel"
          },
          "name": {
            "type": "string",
            "description": "The name of the room offered by the hotel"
          },
            "price": {
                "type": "number",
                "description": "The price of the room offered by the hotel"
            },
        }
      }
    },
    {
      "name": "book_room",
      "description": "Books a hotel room for the given user and duration",
      "parameters": {
        "type": "object",
        "properties": {
          "room_id": {
            "type": "integer",
            "description": "The unique identifier of the room to be booked"
          },
          "full_name": {
            "type": "string",
            "description": "The full name of the guest"
          },
          "email": {
            "type": "string",
            "description": "The email address of the guest"
          },
          "nights": {
            "type": "integer",
            "description": "The number of nights the guest will stay"
          }
        }
      }
    }
  ];
  
  module.exports = functions;