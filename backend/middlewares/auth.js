import jwt from "jsonwebtoken"
import User from "../Models/User.js"

export const protect = async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode)

        if(!decode) return res.status(400).json({message: "not token provided"})

        req.user = await User.findById(decode.id)

        
        next()
        
    } catch (error) {
        res.status(401).json({ message: "Invalid or Expired token" });
    }
    

}