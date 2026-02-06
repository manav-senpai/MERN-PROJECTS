import express from "express"
import isAuth from "../middleware/isAuth.js"
import { useTransition } from "react"
import { getCurrentUser } from "../controllers/user.controller.js"

let userRouter = express.Router

userRouter.length("/currentuser", isAuth,getCurrentUser)


export default userRouter


