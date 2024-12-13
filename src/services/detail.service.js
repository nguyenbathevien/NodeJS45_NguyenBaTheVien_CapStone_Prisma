import { responseError } from "../common/helpers/response.helper.js"
import prisma from "../common/prisma/init.prisma.js"


const detailService = {
    infImage: async(id) => {
        const idImg = +id
        const infImage = await prisma.images.findUnique({
            where: {
                image_id: idImg
            },
            include: {
                users: {
                    select: {
                        user_id: true,
                        full_name: true,
                        email: true,
                    }
                }
            }
        })
        return infImage
    },
    infComment: async(id) => {
        const idImg = +id
        const infComment = await prisma.comments.findMany({
            where: {
                image_id: idImg
            }
        })
        return infComment
    },
    saveImage: async(id,userID) => {
        const idImg = +id
        const imageExists = await prisma.images.findUnique({
            where: { image_id: idImg },
        });
        if (!imageExists) return null;
        const saveImage = await prisma.save_image.findFirst({
            where: {
                image_id: idImg,
                user_id: userID
            }
        })
        return saveImage ? 1 : 0
    },
    addComment: async(idUser,idImage,content) => {
        const img_id = +idImage
        const user_id = +idUser
        const existingImage = await prisma.images.findUnique({
            where: { image_id: img_id },
        });

        if (!existingImage) {
            throw new Error(`Hình ảnh với id ${img_id} không tồn tại`);
        }
        const addComment = await prisma.comments.create({
            data: {
                user_id: user_id,
                image_id: img_id,
                comment_content: content,
            }
        })
        return addComment 
    },
    addImage: async(idUser,nameImg,url,description) => { 
        const user_id = +idUser
        
        const userExist = await prisma.images.findFirst({
            where: {
                link: url
            }
        })

        if(userExist) throw responseError("Đường link này đã được sử dụng",404)


        const addImage = await prisma.images.create({
            data: {
                user_id: user_id,
                
                image_name: nameImg,
                link: url,
                description: description
            }
        })

        return addImage
     },
     addSaveImage: async (idUser, id) => {
        const user_id = +idUser;
        const image_id = +id;
    
        // Kiểm tra xem ảnh có tồn tại không
        const imageExists = await prisma.images.findUnique({
            where: {
                image_id: image_id
            }
        });
    
        if (!imageExists) {
            return null; // Không tìm thấy ảnh
        }
    
        // Kiểm tra xem ảnh đã được lưu chưa
        const alreadySaved = await prisma.save_image.findFirst({
            where: {
                image_id: image_id,
                user_id: user_id
            }
        });
    
        if (alreadySaved) {
            return 1; // Đã lưu ảnh rồi
        }
    
        // Lưu ảnh nếu chưa được lưu
        const saveImage = await prisma.save_image.create({
            data: {
                user_id: user_id,
                image_id: image_id
            }
        });
    
        return saveImage; // Thành công
    }
    
}

export default detailService