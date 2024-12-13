import { BadRequestError } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import tokenService from "./token.service.js";
const authService = {
    register: async(req) => {
        const { email, pass_word, full_name } = req.body;
        console.log({ email, pass_word, full_name });

        const userExists = await prisma.users.findFirst({
            where: {
                email: email
            }
        })
        if(userExists) throw new BadRequestError(`Email đã tồn tại, vui lòng đăng nhập`);
        const hashPassword = bcrypt.hashSync(pass_word, 10);

        const userNew = await prisma.users.create({
         data: {
            email: email,
            full_name: full_name,
            pass_word: hashPassword,
         },
      });
        return userNew
    },
    login: async (req) => { 
        const {email,pass_word} = req.body
        console.log({email,pass_word})
  
        const userExists = await prisma.users.findFirst({
           where: {
              email: email
           },
           select: {
              user_id:true,
              pass_word: true,
  
           }
        })
        if(!userExists) throw new BadRequestError(`Email không tồn tại, vui lòng đăng ký`)
        const passHash = userExists.pass_word
        const isPassword = bcrypt.compareSync(pass_word,passHash)
        if(!isPassword) throw new BadRequestError(`Mật khẩu không chính xác`)
        console.log(userExists)
        
        const tokens = tokenService.createTokens(userExists)
        return tokens
      },
}

export default authService