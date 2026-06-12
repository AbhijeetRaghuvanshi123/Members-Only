import { validationResult } from "express-validator";

const handlePasscodeErrors = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).render('clubjoin', {title: 'Join Club', errors: errors.array(), formData: req.body})
    }

    next();
}

export default handlePasscodeErrors;