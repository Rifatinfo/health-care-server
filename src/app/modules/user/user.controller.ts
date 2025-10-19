import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../middlewares/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../middlewares/sendResponse";
import pick from "../../helper/pick";
import { userFilterableFields } from "./user.constant";


const createPatient = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserService.createPatient(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient create successfully",
    data: result
  })
})

const createAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserService.createAdmin(req);
  console.log(result);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin create successfully",
    data: result
  })
})

const createDoctor = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createDoctor(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor Created successfuly!",
        data: result
    })
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields)
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);


  const result = await UserService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient create successfully",
    meta: result.meta,
    data: result.data
  })
})

export const UserController = {
  createPatient,
  getAllFromDB,
  createAdmin,
  createDoctor
}