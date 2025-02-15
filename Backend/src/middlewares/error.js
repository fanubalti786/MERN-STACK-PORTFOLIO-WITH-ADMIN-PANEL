export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "Server error"
    err.statusCode = err.statusCode || 500
    res.status(err.statusCode).json({success:false,message:err.message})
    next();
}