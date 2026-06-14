const ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }

    res.render('notauth');
}

const isAdmin = (req, res, next) => {
    if(req.user.is_admin){
        return next();
    }

    res.render('notadmin');
}

export {ensureAuthenticated, isAdmin };