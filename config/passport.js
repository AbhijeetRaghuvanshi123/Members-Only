import passport from "passport";
import { Strategy } from "passport-local";
import { validPassword } from "../lib/passwordUtil.js";
import userQuery from "../db/userQuery.js";

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
}

const verifyCallback = async (email, password, done) => {
    try{
        const user = await userQuery.findUserByEmail(email);

        if(!user){
            return done(null, false, { message: 'Incorrect Email'})
        }

        const isValid = await validPassword(password, user.password_hash);

        if(isValid){
            return done(null, user, { message: 'Login Success'});
        }
        else{
            return done(null, false, { message: 'Incorrect Password'})
        }
    }
    catch(error){
        return done(error);
    }
}

const strategy = new Strategy( customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userQuery.findUserById(id);

        const {password , ...safeUser} = user;

        done(null, safeUser);
    } catch (error) {
        done(error);
    }
})