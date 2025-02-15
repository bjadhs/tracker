const errorMiddleware = (err, req, res, next) => {
    try{
        let error = {...err};
        error.message = err.message;
        console.log(error);
        if(err.name === 'CastError'){
            error.message = `Resource not found. Invalid: ${err.path}`;
            error.statusCode = 404;
        }
        if(err.code === 11000){
            error.message = `Duplicate field value entered`;
            error.statusCode = 400;
        }
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map((value) => value.message);
            error.message = `Validation error: ${messages.join('. ')}`;
            error.statusCode = 400;
        }
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error'
        });


    }catch(error){
        console.error('Error handling error', error);
        next(error);
    }
}
export default errorMiddleware;