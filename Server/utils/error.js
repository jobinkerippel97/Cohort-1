const handleError = async (error,req,res,next)=> {
    try {
        const statusCode = error.statusCode || 500;
        const message = error.message || "internal server error";

        res.status(statusCode).message({message})
        
    } catch (error) {
        res.status(error.statusCode || 500).json({message: error.message || "Internal server error",})
    }
}

module.exports = {handleError}