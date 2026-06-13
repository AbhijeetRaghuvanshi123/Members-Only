const newMessageGET = async (req, res) => {
    if(req.isAuthenticated()){
        res.render('newmessage');
    }
    else{
        res.render('notauth');
    }
}

export {newMessageGET};