import userQuery from "../db/userQuery.js";
import { genPassword } from "../lib/passwordUtil.js";
import passport from "passport";

const signUpPOST = async (req, res) => {
    const {firstname, lastname, email, password} = req.body;

    const passwordHash = await genPassword(password);

    await userQuery.addUser({firstname, lastname, email, passwordHash});

    res.redirect('/login');
}

const signUpGET = (req, res) => {
    res.render('signup', { title: 'Sign Up', formData: {firstname : '', lastname: '', email: '', password: '', confirmpassword: ''}});
}

const logInGET = (req, res) => {
    res.render('login', { title: 'Log In', formData: { eamil: '', password: ''}});
}

const loginPOST = passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/messages/new'});

const joinClubGET = (req, res) => {
    res.render('clubjoin', { title: 'Join Club', formData: {passcode : ''}});
}

const joinClubPOST = async (req, res) => {
    const id = 2;
    await userQuery.joinClub(id);
}

export {signUpPOST, signUpGET, joinClubGET, joinClubPOST, logInGET, loginPOST};