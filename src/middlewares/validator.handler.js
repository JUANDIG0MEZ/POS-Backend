function validatorHandlerFormData(schema, property1, property2) {
    return (req, res, next) => {
        const data = JSON.parse(req[property1][property2])
        const { error } = schema.validate(data, {convert: true});
        if (error){
            const error2 = new Error(error.message);
            next(error2);
        } 
        next();
    }
}


function validatorHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];

        const { error } = schema.validate(data)
        if (error){
            const error2 = new Error(error.message);
            next(error2)
        }
        next();
    }
}


module.exports = {
    validatorHandler,
    validatorHandlerFormData}