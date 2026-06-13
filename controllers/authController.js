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
    res.render('signup', { title: 'Sign Up', formData: {}});
}

const logInGET = (req, res) => {
    res.render('login', { title: 'Log In', formData: {}});
}

const loginPOST = passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/messages/new'});

const joinClubGET = (req, res) => {
    res.render('clubjoin', { title: 'Join Club', formData: {}});
}

const joinClubPOST = async (req, res) => {
    const id = req.user.id;
    await userQuery.joinClub(id);

    res.redirect('/messages/all');
}

export {signUpPOST, signUpGET, joinClubGET, joinClubPOST, logInGET, loginPOST};