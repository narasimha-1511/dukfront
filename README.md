# Hotel Booking Chatbot

This is a RESTful API built using Express.js that implements a chatbot for handling hotel booking queries. The chatbot uses OpenAI's API for natural language processing and maintains conversation history using SQLite and Sequelize.

## Tech Stack

- **Backend**: Express.js
- **Natural Language Processing**: OpenAI API
- **Database**: SQLite, Sequelize
- **Frontend**: React (optional)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/hotel-booking-chatbot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd hotel-booking-chatbot
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the OpenAI API key:

   - Create an account on the OpenAI platform if you haven't already.
   - Generate an API key from the OpenAI dashboard.
   - Create a `.env` file in the root directory of the project.
   - Add the following line to the `.env` file, replacing `YOUR_API_KEY` with the API key you generated:

     ```
     OPENAI_API_KEY=YOUR_API_KEY
     ```

5. Build the project:

   ```bash
   npm run build
   ```

6. Start the server:

   ```bash
   npm start
   ```

The server will start running on `http://localhost:3000`.

## API Endpoints

### 1. List Hotel Room Options

To get the list of available rooms at Bot9 Palace:

```bash
curl -X GET http://localhost:3000/rooms
```

### 2. Create a Booking

To create a new booking:

```bash
curl -X POST http://localhost:3000/book \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": 2,
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "nights": 3
  }'
```

## Chatbot Flow

1. User initiates a conversation about booking a resort room.
2. Bot fetches room options from the API and responds with a list of room options.
3. User selects a room.
4. Bot provides pricing information.
5. User confirms they want to proceed with booking.
6. Bot makes a simulated API call to book the room and returns a booking confirmation with a booking ID.

## Bonus Features

- Implemented basic error handling for invalid user inputs or API failures.
- Added a simple frontend interface for interacting with the chatbot using React.

## Conclusion

This project demonstrates the implementation of a RESTful API with a chatbot functionality using Express.js, OpenAI's API, SQLite, and Sequelize. The chatbot is capable of handling hotel booking queries and maintaining conversation history.
