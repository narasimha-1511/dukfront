const { v4: uuidv4 } = require('uuid');
const  ConversationMessage  = require('../model/Session');
const Chat = require('../services/gemini');
const run = require('../services/aa');
const runConversation = require('../services/openai');

class chatRouterController{

    static async createSession(req, res){
        try{
            const sessionId = uuidv4();
            
            //creating a session
            await ConversationMessage.create({
                sessionId,
                message: 'Hello! How can I help you?',
                isUserMessage: false
            });

            //cookie
            res.cookie('sessionId', sessionId, {
                maxAge: 24 * 60 * 60 * 1000 , // 1 day 
                httpOnly: true
            });

            res.status(200).json({
                message: 'Session created Successfully',
                sessionId: sessionId
            });

        }
        catch(err){
            res.status(500).json({
                message: 'Internal server error'
            });
            console.log("Error while creating session: ", err);
        }
    }

    static async deleteSession(req, res){
        try{
            const sessionId = req.sessionId;
            await ConversationMessage.destroy({
                where: {
                    sessionId
                }
            });

            res.clearCookie('sessionId');

            res.status(200).json({
                message: 'Session deleted'
            });
        }
        catch(err){
            res.status(500).json({
                message: 'Internal server error'
            });
            console.log("Error while deleting session: ", err);
        }
    }

    static async sendMessage(req, res){
        try{
            const { message  } = req.body;
            const sessionId = req.sessionId;

            console.log("Message: ", message);

            
            const response = await runConversation(message , sessionId);
            // const response = await run(message);
            
            ConversationMessage.create({
                sessionId,
                message,
                isUserMessage: true
            });

            console.log(response)

            ConversationMessage.create({
                sessionId,
                message: response[0].message === undefined ? response : response[0].message.content,
                isUserMessage: false
            });
            
            res.status(200).json({
                message: 'Message sent successfully',
                data : response[0].message === undefined ? response : response[0].message.content
            });
        }
        catch(err){
            res.status(500).json({
                message: 'Internal server error'
            });
            console.log("Error while sending message: ", err);
        }
    }
}

module.exports = chatRouterController;