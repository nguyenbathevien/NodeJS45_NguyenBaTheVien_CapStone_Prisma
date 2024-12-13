import { ACCESS_TOKEN_SECRET } from "../constant/app.constant.js"
import { ForbiddenError, UnauthorizedError } from "../helpers/error.helper.js"
import jwt from "jsonwebtoken"
import prisma from "../prisma/init.prisma.js"

const protect = async(req,res,next) => {
    try {
        const accessToken = req.headers?.authorization?.split(" ")[1]
        if(!accessToken) throw new UnauthorizedError(`Vui lòng đăng nhập`)
        const decodeToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
        const user = await prisma.users.findUnique({
            where: {
                user_id: decodeToken.user_id
            },
            select: {
                user_id:true,
                full_name: true,
                avatar: true,
                email: true,
                pass_word:true
            }
        })
        if(!user) throw new ForbiddenError()
        req.user = user
        console.log({user});
        next()
    } catch (error) {
        next(error)
    }
}

export default protect