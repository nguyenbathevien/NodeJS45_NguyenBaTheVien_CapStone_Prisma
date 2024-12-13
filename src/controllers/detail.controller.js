import { responseSuccess,responseError } from "../common/helpers/response.helper.js";
import detailService from "../services/detail.service.js";

const detailController = {
    infImage: async(req,res,next) => {
        try {
            const {id} = req.params
            console.log({id})
            const result = await detailService.infImage(id)
            if(result){
                const resData = responseSuccess(result,'Lấy thông tin hình ảnh thành công')
            res.status(resData.code).json(resData);
            }else{
                const resData = responseError('Không tìm thấy hình ảnh',404)
                res.status(resData.code).json(resData);
            }
        } catch (error) {
            next(error)
        }
    },
    infComment: async(req,res,next) => {
        try {
            const {id} = req.params
            console.log({id})
            const result = await detailService.infComment(id)
            if(result){
                const resData = responseSuccess(result,'Lấy thông tin bình luận thành công')
            res.status(resData.code).json(resData);
            }else{
                const resData = responseError('Không tìm thấy bình luận',404)
                res.status(resData.code).json(resData);
            }
        } catch (error) {
            next(error)
        }
    },
    saveImage: async(req,res,next) => {
        try {
            const {id} = req.params
            console.log({id})
            const userID = req.user.user_id
            console.log({userID})
            const result = await detailService.saveImage(id,userID)
            if(result === 1){
                const resData = responseSuccess(result,'Bạn đã Save hình này rồi')
                return res.status(resData.code).json(resData);
            }
            if(result === 0 ){
                const resData = responseSuccess(result,'Bạn chưa Save hình này ')
                return res.status(resData.code).json(resData);
            }
            if(!result){
                const resData = responseError('Không tìm thấy hình ảnh để lưu',404)
                return res.status(resData.code).json(resData);
            }
        } catch (error) {
            next(error)
        }
    },
    addComment: async(req,res,next) => {
        try {
            const {idImage,content} = req.body
            const idUser = req.user.user_id
            if ( !idImage || !content) {
                return res.status(400).json({
                    code: 400,
                    message: 'Thiếu thông tin cần thiết',
                });
            }
            const result = await detailService.addComment(idUser,idImage,content)
            const resData = responseSuccess(result,'Bình luận thành công')
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error)
        }
    },
    addImage: async(req,res,next) => { 
        try {
            const idUser = req.user.user_id
            const { nameImg,url,description} = req.body
            if (  !nameImg || !url || !description) {
                return res.status(400).json({
                    code: 400,
                    message: 'Thiếu thông tin cần thiết',
                });
            }
            const result = await detailService.addImage(idUser,nameImg,url,description)
            const resData = responseSuccess(result,'Thêm ảnh thành công')
            res.status(resData.code).json(resData);
        } catch (error) {
            
            next(error)
        }
    },
    addSaveImage: async(req, res, next) => { 
        try {
            const idUser = req.user.user_id;
            const { id } = req.params;
    
            // Gọi service để thêm ảnh vào danh sách đã lưu
            const result = await detailService.addSaveImage(idUser, id);
    
            if (result === null) {
                // Không tìm thấy ảnh
                const resData = responseError('Không tìm thấy ảnh để lưu', 404);
                return res.status(resData.code).json(resData);
            }
    
            if (result === 1) {
                // Ảnh đã được lưu rồi
                const resData = responseError('Bạn đã lưu ảnh này rồi', 400);
                return res.status(resData.code).json(resData);
            }
    
            // Thành công
            const resData = responseSuccess(result, 'Lưu ảnh thành công');
            return res.status(resData.code).json(resData);
    
        } catch (error) {
            // Nếu có lỗi khác, chuyển cho middleware xử lý tiếp theo
            next(error);
        }
    }
    
}

export default detailController