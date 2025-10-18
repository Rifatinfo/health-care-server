import { Request, Response } from "express";
import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { AuthenticatedRequest, IJwtPayload } from "../../types/common";

const insertIntoDB = catchAsync(async (req: AuthenticatedRequest,  res: Response) => {
    const user = req.user;
    const result = await DoctorScheduleService.insertIntoDB(user as IJwtPayload, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor Schedule created Successfully",
        data: result
    });
})

export const DoctorScheduleController = {
    insertIntoDB,
}