const ConversationMessage = require('../model/Session');

const validateSession = async (req, res, next) => {
    const sessionId = req.cookies.sessionId;
    
    if (!sessionId) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    try{
        const session = await ConversationMessage.findOne({
            where: {
                sessionId
            }
        });

        if(!session){
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
    }
    catch(err){
        console.log("Error while validating session: ", err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }

    req.sessionId = sessionId;
    next();
}

module.exports = validateSession;