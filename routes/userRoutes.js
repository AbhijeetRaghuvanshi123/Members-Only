import Router from 'express';
import { joinClubGET, joinClubPOST, signUpGET, signUpPOST } from "../controllers/userController.js";
import validateSignup from '../validators/authValidator.js';
import handleValidationErrors from '../middleware/validationErrors.js';
import validateClubPasscode from '../validators/clubpassValidator.js';
import handlePasscodeErrors from '../middleware/clubpasscodeErrors.js';
const userRouter = Router();

userRouter.get('/signup', signUpGET);
userRouter.post('/signup', validateSignup, handleValidationErrors, signUpPOST);
userRouter.get('/joinclub', joinClubGET);
userRouter.post('/joinclub', validateClubPasscode, handlePasscodeErrors, joinClubPOST);

export default userRouter;