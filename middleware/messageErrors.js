import { validationResult } from "express-validator";

const handleNewMessageErrors = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).render('newmessage', {title: 'New Message', errors: errors.array() , formData: req.body});
    }

    next();
}

export default handleNewMessageErrors;