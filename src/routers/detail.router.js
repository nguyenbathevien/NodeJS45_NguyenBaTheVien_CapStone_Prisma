import express from 'express'
import protect from "../common/middlewares/protect.middleware.js"
import detailController from '../controllers/detail.controller.js'
const detailRouter = express.Router()

detailRouter.use(protect)
detailRouter.get("/image/:id", detailController.infImage )
detailRouter.get("/comment/:id", detailController.infComment)
detailRouter.get("/saveImage/:id", detailController.saveImage)
detailRouter.post("/comment", detailController.addComment)
detailRouter.post("/image", detailController.addImage)
detailRouter.post("/saveImage/:id", detailController.addSaveImage)
 
export default detailRouter