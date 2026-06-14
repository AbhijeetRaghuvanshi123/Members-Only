import Router from 'express';
import { joinAdminPOST, joinClubGET, joinClubPOST, logInGET, loginPOST, logoutGET, signUpGET, signUpPOST } from "../controllers/authController.js";
import {handleSignUpValidationErrors, handleLoginValidationErrors} from '../middleware/validationErrors.js'
import { validateLogIn, validateSignup} from '../validators/authValidator.js'
import {validateClubPasscode , validateAdminPasscode} from '../validators/passValidator.js';
import { handleAdminPasscodeErrors, handleClubPasscodeErrors  } from '../middleware/passcodeErrors.js';
import { ensureAuthenticated, isAdmin} from '../middleware/ensureAuthentication.js';
const authRouter = Router();

authRouter.get('/signup', signUpGET);
authRouter.post('/signup', validateSignup, handleSignUpValidationErrors, signUpPOST);

authRouter.get('/joinclub', ensureAuthenticated, joinClubGET);
authRouter.post('/joinclub', ensureAuthenticated ,validateClubPasscode, handleClubPasscodeErrors, joinClubPOST);

authRouter.post('/joinadmin', ensureAuthenticated, validateAdminPasscode, handleAdminPasscodeErrors, joinAdminPOST);

authRouter.get('/login', logInGET);
authRouter.post('/login', validateLogIn, handleLoginValidationErrors, loginPOST);

authRouter.get('/logout', ensureAuthenticated, logoutGET);

export default authRouter;