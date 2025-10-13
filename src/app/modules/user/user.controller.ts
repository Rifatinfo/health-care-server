import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../middlewares/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../middlewares/sendResponse";
import { prisma } from "../../config/db";


const createPatient = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserService.createPatient(req);
  console.log(result);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient create successfully",
    data: result
  })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const {page, limit} = req.query;
  const result = await UserService.getAllFromDB({page : Number(page), limit : Number(page)});
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient create successfully",
    data: result
  })
})

export const UserController = {
  createPatient,
  getAllFromDB
}