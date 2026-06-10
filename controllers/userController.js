import userQuery from "../db/userQuery.js";
import bcrypt from "bcryptjs";

const signUpPOST = async (req, res) => {
    const {firstname, lastname, email, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    await userQuery.addUser({firstname, lastname, email, passwordHash});

    res.redirect('/login');
}

const signUpGET = (req, res) => {
    res.render('signup', { title: 'Sign Up', formData: {firstname : '', lastname: '', email: '', password: '', confirmpassword: ''}});
}

export {signUpPOST, signUpGET};