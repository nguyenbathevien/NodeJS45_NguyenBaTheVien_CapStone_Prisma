import express from "express"
import userController from "../controllers/user.controller.js"
import protect from "../common/middlewares/protect.middleware.js"
const userRouter = express.Router()
userRouter.use(protect)

userRouter.put('/edit', userController.editUser)

export default userRouter