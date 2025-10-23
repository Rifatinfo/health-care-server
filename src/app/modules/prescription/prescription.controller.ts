import { Request, Response } from "express";
import { catchAsync } from "../../middlewares/catchAsync";
import { IJwtPayload } from "../../types/common";
import { sendResponse } from "../../middlewares/sendResponse";
import { PrescriptionService } from "./prescription.service";

const createPrescription = catchAsync(async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const user = req.user;
    const result = await PrescriptionService.createPrescription(user as IJwtPayload, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "prescription created successfully!",
        data: result
    });
});

export const PrescriptionController = {
    createPrescription
}