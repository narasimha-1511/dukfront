const express = require('express');
const chatRouterController = require('../controllers/chatController');
const validateSession = require('../middlewares/validateSession');

const chatRouter = express.Router();
//creating a session for the user
chatRouter.post('/session', chatRouterController.createSession);

//deleting the session
chatRouter.delete('/session', validateSession , chatRouterController.deleteSession);

//chat route
chatRouter.post('/', validateSession ,   chatRouterController.sendMessage);

module.exports = chatRouter;