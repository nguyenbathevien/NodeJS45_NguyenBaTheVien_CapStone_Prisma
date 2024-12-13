import express from "express"
import authRouter from "./auth.router.js"
import imageRouter from "./image.router.js"
import detailRouter from "./detail.router.js"
import manageRouter from "./manage.router.js"
import userRouter from "./user.router.js"

const rootRouter = express.Router()
// home
rootRouter.use("/auth", authRouter)
rootRouter.use("/image", imageRouter)
// chi tiet
rootRouter.use("/detail", detailRouter)
// quản lý ảnh
rootRouter.use("/manage", manageRouter)
//trang sửa thông tin cá nhân
rootRouter.use("/user",userRouter)
export default rootRouter
