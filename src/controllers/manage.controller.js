import { responseSuccess, responseError } from "../common/helpers/response.helper.js";
import manageService from "../services/manage.service.js";

const manageController = {
    infUser: async (req, res, next) => {
        try {
            const { id } = req.params; 
            const result = await manageService.infUser(id); 
            
            const resData = responseSuccess(result, "Lấy thông tin người dùng thành công");
            res.status(resData.code).json(resData);
        } catch (error) {
            if (error.message) {
                const resData = responseError(error.message, 404);
                res.status(resData.code).json(resData);
            } else {
                next(error); 
            }
        }
    },
    saveImage: async(req,res,next) => {
       try {
        const idUser = req.user.user_id
        console.log({idUser})
        const result = await manageService.saveImage(idUser)
        const resData = responseSuccess(result,"Lấy danh sách hình ảnh đã lưu thành công")
        res.status(resData.code).json(resData);
       } catch (error) {
        next(error)
       }
    },
    createdImage: async(req,res,next) => {
       try {
        const {id} = req.params
        const result = await manageService.createdImage(id)
        const resData = responseSuccess(result,"Lấy danh sách hình ảnh đã tạo của người dùng thành công")
        res.status(resData.code).json(resData);
       } catch (error) {
        next(error)
       }
    },
    deleteImage: async(req,res,next) => {
       try {
        const {id} = req.params
        const idUser = req.user.user_id
        const result = await manageService.deleteImage(idUser,id)
        const resData = responseSuccess(result,"Xóa ảnh thành công")
        res.status(resData.code).json(resData);
       } catch (error) {
        next(error)
       }
    },
};

export default manageController;
