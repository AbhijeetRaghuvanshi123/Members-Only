import { validationResult } from "express-validator";

const handleClubPasscodeErrors = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).render('clubjoin', {title: 'Join Club', errors: errors.array(), formData: req.body})
    }

    next();
}

const handleAdminPasscodeErrors = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).render('notadmin', {errors: errors.array()});
    }

    next();
}

export { handleClubPasscodeErrors, handleAdminPasscodeErrors };