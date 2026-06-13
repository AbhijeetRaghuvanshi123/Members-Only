import Router from 'express';
import { joinClubGET, joinClubPOST, logInGET, loginPOST, signUpGET, signUpPOST } from "../controllers/authController.js";
import {handleSignUpValidationErrors, handleLoginValidationErrors} from '../middleware/validationErrors.js'
import { validateLogIn, validateSignup} from '../validators/authValidator.js'
import validateClubPasscode from '../validators/clubpassValidator.js';
import handlePasscodeErrors from '../middleware/clubpasscodeErrors.js';
const authRouter = Router();

authRouter.get('/signup', signUpGET);
authRouter.post('/signup', validateSignup, handleSignUpValidationErrors, signUpPOST);

authRouter.get('/joinclub', joinClubGET);
authRouter.post('/joinclub', validateClubPasscode, handlePasscodeErrors, joinClubPOST);

authRouter.get('/login', logInGET);
authRouter.post('/login', validateLogIn, handleLoginValidationErrors, loginPOST);

export default authRouter;