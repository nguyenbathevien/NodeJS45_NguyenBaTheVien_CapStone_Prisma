import { responseError } from "../common/helpers/response.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";

const userService = {
    editUser: async (id, email, currentPassword, newPassword, fullname, age, avatar) => {
        const user_id = +id;
        if (!user_id) throw responseError("Bạn cần đăng nhập để biết ai mà chỉnh sửa", 401);

        const existingUser = await prisma.users.findUnique({
            where: {
                user_id: user_id
            }
        });

        if (!existingUser) throw responseError("Người dùng không tồn tại", 404);

        if (newPassword) {
            if (!currentPassword) {
                throw responseError("Bạn cần nhập mật khẩu hiện tại để đổi mật khẩu", 400);
            }
            const isPasswordCorrect = bcrypt.compareSync(currentPassword, existingUser.pass_word);
            if (!isPasswordCorrect) {
                throw responseError("Mật khẩu hiện tại không chính xác", 400);
            }
        }
        if (email && email !== existingUser.email) {
            const emailExists = await prisma.users.findFirst({
                where: {
                    email: email
                }
            });
            if (emailExists) throw responseError("Email đã được sử dụng bởi người khác", 400);
        }

        // Mã hóa mật khẩu mới 
        const hashedPassword = newPassword ? bcrypt.hashSync(newPassword, 10) : existingUser.pass_word;

        const updatedUser = await prisma.users.update({
            where: {
                user_id: user_id
            },
            data: {
                email: email || existingUser.email,
                pass_word: hashedPassword,
                full_name: fullname || existingUser.full_name,
                age: +age || existingUser.age,
                avatar: avatar || existingUser.avatar,
                updated_at: new Date() 
            },
            select: {
                user_id: true,
                email: true,
                full_name: true,
                age: true,
                avatar: true,
                updated_at: true
            }
        });

        return updatedUser;
    }
};

export default userService;
