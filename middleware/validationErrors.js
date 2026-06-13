import { validationResult } from "express-validator";

const handleSignUpValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).render('signup', { title: 'Sign Up',errors: errors.array(), formData: req.body});
    }
    
    next();
}

const handleLoginValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).render('login', {title: 'Log In', errors: errors.array(), formData: req.body});
    }

    next();
}

export { handleLoginValidationErrors, handleSignUpValidationErrors};