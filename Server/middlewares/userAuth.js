const jwt = require('jsonwebtoken');

const userAuth = (req,res,next) => {
try {

    // console.log("cookies====", req.cookies)
    const {token} = req.cookies //token is stored in the cookies "destructuring the token using req.cookies"//
    if(!token){
       return res.status(401).json({success: false, message: "Unauthorized access"})
    }

    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(!tokenVerified){
        return res.status(401).json({success: false, message: "User not authorized"})
    }

    req.user = tokenVerified // created a new object "req.user" to pass verifiedToken value to userProfile//

    next()
} catch (error) {
    console.log(error)
    res.status(error.statusCode || 500).json({message: error.message || "Internal server error"})
}
}

module.exports = { userAuth }