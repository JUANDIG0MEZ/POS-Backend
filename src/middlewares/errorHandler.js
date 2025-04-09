

function handlerError(err, req, res, next) {
    console.log("Handler Error")
    res.status(500).json({
        status: false,
        message: err.message,
    })
}

module.exports = {
    handlerError
}