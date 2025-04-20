

function handlerError(err, req, res, next) {
    console.log(err)
    res.status(500).json({
        status: false,
        message: err.message,
    })
}

module.exports = {
    handlerError
}