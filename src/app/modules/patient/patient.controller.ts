import { Request, Response } from "express";
import { catchAsync } from "../../middlewares/catchAsync";
import { IJwtPayload } from "../../types/common";
import { sendResponse } from "../../middlewares/sendResponse";
import { StatusCodes } from "http-status-codes";
import { PatientService } from "./patient.service";

const updateIntoBD = catchAsync(async (req : Request, res : Response) => {
    const user = req.user;
    const result = await PatientService.updateIntoBD(user as IJwtPayload, req.body);
    sendResponse(res , {
        statusCode : StatusCodes.OK,
        success : true,
        message : 'Patient Update successfully',
        data : result
    })
})

export const PatientController = {
    updateIntoBD
}