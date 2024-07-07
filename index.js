const express = require('express');
const sequelize = require('./database/db');
const chatRouter = require('./routers/chatRouter');
const cors = require('cors');

require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use('/chat' , chatRouter);
app.use(express.static(path.join(__dirname, "./frontend/dist")));

(async () => {
  await sequelize.sync();
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
  console.log("Database synced");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();