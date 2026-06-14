import { Router } from "express";
import { allMessageGET, deletMessageGET, newMessageGET, newMessagePOST } from "../controllers/messageController.js";
import { isAdmin, ensureAuthenticated } from "../middleware/ensureAuthentication.js";
import validateMessage from "../validators/messageValidator.js";
import handleNewMessageErrors from "../middleware/messageErrors.js";

const messageRouter = Router();

messageRouter.get('/new', ensureAuthenticated ,newMessageGET);
messageRouter.post('/new', ensureAuthenticated, validateMessage, handleNewMessageErrors, newMessagePOST);
messageRouter.get('/', ensureAuthenticated, allMessageGET);
messageRouter.get('/delete', ensureAuthenticated, isAdmin, deletMessageGET);

export default messageRouter;