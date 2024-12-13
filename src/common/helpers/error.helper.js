import pkg from 'jsonwebtoken';
import { responseError } from './response.helper.js';
const { TokenExpiredError,JsonWebTokenError } = pkg;


export const handleError = (err,req,res,next) => {
    console.log(`Lỗi : `, err)
    if(err instanceof JsonWebTokenError) err.code = 401
    if(err instanceof TokenExpiredError) {err.code = 403}
    const resData = responseError(err.message,err.code)
    res.status(resData.code).json(resData)
}

export class BadRequestError extends Error {
    //co che cua class giup chay ham
    constructor(message = "BadRequestError") {
        super(message);
        this.code = 400
    }
}
export class ForbiddenError extends Error {
    //co che cua class giup chay ham
    constructor(message = "ForbiddenError") {
        super(message);
        this.code = 403
    }
}
export class UnauthorizedError extends Error {
    //co che cua class giup chay ham
    constructor(message = "UnauthorizedError") {
        super(message);
        this.code = 401
    }
}