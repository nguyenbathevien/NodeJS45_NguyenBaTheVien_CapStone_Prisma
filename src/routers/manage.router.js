import express from "express"
import manageController from "../controllers/manage.controller.js"
import protect from "../common/middlewares/protect.middleware.js"

const manageRouter = express.Router()
manageRouter.use(protect)
//lấy thông tin theo user
manageRouter.get("/user/:id", manageController.infUser)
//lấy ảnh đã lưu theo user
manageRouter.get("/save-images", manageController.saveImage)
//lấy ảnh đã tạo theo user
manageRouter.get("/images/:id", manageController.createdImage)
//Xóa ảnh  theo id ảnh
manageRouter.delete("/images/:id", manageController.deleteImage)
export default manageRouter