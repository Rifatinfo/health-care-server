import { UserStatus } from "@prisma/client"
import { prisma } from "../../config/db"
import bcrypt from "bcryptjs";
import AppError from "../../errorHelpers/AppError";
import { StatusCodes } from "http-status-codes";
import { jwtHelper } from "../../helper/jwthelper";

const login = async (payload: { email: string, password: string }) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }
    if (!user.password) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User has no password set");
    }
    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);
    if (!isCorrectPassword) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Password is incorrect")
    }
    const accessToken = jwtHelper.generateToken({email : user.email, role : user.role}, "abcd", "1h");
    const refreshToken = jwtHelper.generateToken({email : user.email, role : user.role}, "abcd" , "90d");
    return {
        accessToken,
        refreshToken,
        needPasswordChange: user.needPasswordChange
    }
}

export const AuthService = {
    login
}