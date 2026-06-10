import Router from 'express';
import { signUpGET, signUpPOST } from "../controllers/userController.js";
import validateSignup from '../validators/authValidator.js';
import handleValidationErrors from '../middleware/validationErrors.js';
const userRouter = Router();

userRouter.get('/signup', signUpGET);
userRouter.post('/signup', validateSignup, handleValidationErrors, signUpPOST);

export default userRouter;