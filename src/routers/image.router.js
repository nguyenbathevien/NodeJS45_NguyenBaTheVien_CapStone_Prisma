import express from "express"
import imageController from "../controllers/image.controller.js"
import protect from "../common/middlewares/protect.middleware.js"

const imageRouter = express.Router()

imageRouter.use(protect)
imageRouter.get('/listImage', imageController.listImage)
imageRouter.get('/nameImage', imageController.nameImage)

export default imageRouter