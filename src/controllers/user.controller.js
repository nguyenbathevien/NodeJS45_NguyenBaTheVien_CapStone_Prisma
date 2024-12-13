import { responseSuccess } from "../common/helpers/response.helper.js";
import userService from "../services/user.service.js";

const userController = {
    editUser: async (req, res, next) => {
        try {
            const id = req.user.user_id;
            const { email, currentPassword, newPassword, fullname, age, avatar } = req.body;
            const result = await userService.editUser(
                id,
                email,
                currentPassword,
                newPassword,
                fullname,
                age,
                avatar
            );
            const resData = responseSuccess(result, "Sửa thông tin thành công");
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error);
        }
    }
};

export default userController;
