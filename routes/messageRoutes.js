import { Router } from "express";
import { allMessageGET, newMessageGET, newMessagePOST } from "../controllers/messageController.js";
import ensureAuthenticated from "../middleware/ensureAuthentication.js";
import validateMessage from "../validators/messageValidator.js";
import handleNewMessageErrors from "../middleware/messageErrors.js";

const messageRouter = Router();

messageRouter.get('/new', ensureAuthenticated ,newMessageGET);
messageRouter.post('/new', ensureAuthenticated, validateMessage, handleNewMessageErrors, newMessagePOST);
messageRouter.get('/all', ensureAuthenticated, allMessageGET);

export default messageRouter;