
import User from "../Models/User.js"

export const getUsers = async(req, res) => {
    const users = await User.find().select("-password")
    res.json({users})
}