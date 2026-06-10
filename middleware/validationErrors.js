import { validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).render('signup', { title: 'Sign Up',errors: errors.array(), formData: req.body});
    }
    
    next();
}

export default handleValidationErrors;