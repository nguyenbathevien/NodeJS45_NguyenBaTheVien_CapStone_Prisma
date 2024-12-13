import { responseError } from "../common/helpers/response.helper.js";
import prisma from "../common/prisma/init.prisma.js";

const manageService = {
    infUser: async (id) => {
        const idUser = +id; // Chuyển kiểu số

        // Kiểm tra người dùng tồn tại
        const userExist = await prisma.users.findUnique({
            where: { user_id: idUser },
        });

        if (!userExist) {
            throw new Error("Không tìm thấy id người dùng"); 
        }

        // Trả về thông tin chi tiết
        const infUser = await prisma.users.findUnique({
            where: { user_id: idUser },
            select: {
                user_id: true,
                email: true,
                full_name: true,
                age: true,
                avatar: true,
                created_at: true,
                updated_at: true,
            },
        });

        return infUser;
    },
    saveImage: async(idUser) => {
        const id = +idUser
        const listSave = await prisma.save_image.findMany({
            where:{
                user_id: id
            }
        })

        return listSave
    },
    deleteImage: async (idUser, id) => {
        const user_id = +idUser;
        const image_id = +id;
    
        if (!image_id || isNaN(image_id)) {
            throw responseError("ID hình ảnh không hợp lệ", 400);
        }
    
        // Kiểm tra hình ảnh có tồn tại không
        const imageExist = await prisma.images.findUnique({
            where: {
                image_id: image_id,
            },
        });
    
        if (!imageExist) {
            throw responseError("Không tìm thấy hình ảnh để xóa", 404);
        }
    
        // Kiểm tra quyền sở hữu
        if (imageExist.user_id !== user_id) {
            throw responseError("Bạn không có quyền xóa hình ảnh này", 403);
        }
    
        // Xóa các bản ghi liên quan trong bảng comments và save_image
        await prisma.comments.deleteMany({
            where: { image_id: image_id },
        });
    
        await prisma.save_image.deleteMany({
            where: { image_id: image_id },
        });
    
        // Thực hiện xóa ảnh
        await prisma.images.delete({
            where: { image_id: image_id },
        });
    
        return "Hình ảnh đã được xóa thành công";
    },
    createdImage: async(id) => {
        const idUser = +id
        console.log({idUser})
        if (!id || isNaN(id)) {
            throw responseError("ID người dùng không hợp lệ", 400);
        }
        const userExist = await prisma.users.findUnique({
            where: {
                user_id: idUser
            }
        })
        if(!userExist) throw responseError("Không tìm thấy người dùng", 404)
        const listImg = await prisma.images.findMany({
            where:{
                user_id: idUser
            }
        })

        return listImg
    },
};

export default manageService;
