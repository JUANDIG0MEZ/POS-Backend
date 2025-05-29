

function handlerError(err, req, res, next) {
    console.error(err);
    res.status(400).json({
        status: false,
        message: err,
    })
}

module.exports = {
    handlerError
}