const express = require('express');
const sequelize = require('./database/db');
const chatRouter = require('./routers/chatRouter');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/chat' , chatRouter);

(async () => {
    await sequelize.sync()
    console.log('Database synced');
        app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        });
})();
