class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    };
};



export const errorMiddleware = (err,req,res,next) => {
    
}

export default ErrorHandler;