const pageNotFoundError = (req, res) => {
    res.status(404).render('404error');
};

const globalErrors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
}

export {pageNotFoundError, globalErrors};