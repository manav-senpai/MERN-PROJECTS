import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser } from "../controllers/user.controller.js"

// Use parentheses () to initialize the router
const userRouter = express.Router() 

// Changed .length to .get
userRouter.get("/currentuser", isAuth, getCurrentUser)

export default userRouter