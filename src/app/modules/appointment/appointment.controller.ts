import { Request, Response } from "express";
import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { IJwtPayload } from "../../types/common";
import { AppointmentService } from "./appointment.service";
import pick from "../../helper/pick";

const createAppointment = catchAsync
    (async (req: Request & { user?: IJwtPayload }, res: Response) => {
        const user = req.user;
        const result = await AppointmentService.createAppointment(user as IJwtPayload, req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Appointment created successfully!",
            data: result
        })
    });

const getMyAppointment = catchAsync(async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const fillters = pick(req.query, ["status", "paymentStatus"])
    const user = req.user;
    const result = await AppointmentService.getMyAppointment(user as IJwtPayload, fillters, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Appointment fetched successfully!",
        data: result
    });
})

const updateAppointmentStatus = catchAsync(async (req: Request & { user?: IJwtPayload} , res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;

    const result = await AppointmentService.updateAppointmentStatus(id, status, user as IJwtPayload);
     sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Appointment Updated successfully!",
        data: result
    });
})

export const AppointmentController = {
    createAppointment,
    getMyAppointment,
    updateAppointmentStatus
}