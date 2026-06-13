import { Router } from "express";
import { newMessageGET } from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get('/new', newMessageGET);

export default messageRouter;