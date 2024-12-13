import prisma from "../common/prisma/init.prisma.js"


const imageService = {
    listImage: async(req) => {
        const listImage = await prisma.images.findMany(
            {
                orderBy: {
                    created_at: `desc`
                  }
            }
        )
        return listImage
    },
    nameImage: async (name) => {
        const nameImage = await prisma.images.findMany({
            where: {
                image_name: {
                    contains: name,
                },
            },
        });
        if (nameImage.length === 0) {
            return { message: "Không tìm thấy ảnh" };
        }
        return nameImage;
    }
    
}

export default imageService