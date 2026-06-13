const ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }

    res.render('notauth');
}

export default ensureAuthenticated;