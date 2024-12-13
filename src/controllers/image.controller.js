import { responseSuccess } from "../common/helpers/response.helper.js";
import imageService from "../services/image.service.js"


const imageController = {
    listImage: async(req,res,next) => { 
        try {
            const result = await imageService.listImage()
            const resData = responseSuccess(result,'Lấy danh sách hình ảnh thành công')
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
     },
    nameImage: async(req,res,next) => { 
        try {
            const {name} = req.query
            const result = await imageService.nameImage(name)
            const resData = responseSuccess(result,'Lấy danh sách hình ảnh thành công')
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
     }

     
}

export default imageController