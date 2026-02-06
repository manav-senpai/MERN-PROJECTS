import User from "../model/user.model.js"


export const getCurrentUser = async (req , res ) => {
    try {
        let user = await User.findById ( req.userId).select("-password")
        if(!user){
            res.status(400).json({message:"User is not found"})
        }
        res.status(200).json(user)
        
    } catch {
        res.status(500).json({message:`getCurrentUser error ${error}`})

    }
}