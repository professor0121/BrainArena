import jwt from "jsonwebtoken";



export const userAuthMiddleware=(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]|| req.cookies.token;
    if(!token) return res.status(401).json({message:"Unauthorized"});
    console.log("Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
}