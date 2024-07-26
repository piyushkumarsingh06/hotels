const jwt  = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) =>{
    //first check request has authorization or not

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: 'Token Not found'});
    //Extract the jwt token from request headers

const token  = req.headers.authorization.split(' ')[1];

if(!token) return res.status(401).json({error : 'Unauthorized'});

try {
    //Verify jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //attach user informatiom to the request object

    req.user = decoded;
    next();
    
} catch (error) {
    console.log(error);
    res.status(401).json({error:'Invalid token'});
}
}

const generateToken = (userData) =>{
    //Genarte token using user data

    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn: 30});
}

module.exports = {jwtAuthMiddleware,generateToken};