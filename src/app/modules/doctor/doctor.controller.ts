import { Request, Response } from "express";
import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import pick from "../../helper/pick";
import { doctorFilterableFields } from "./doctor.constant";
import { DoctorService } from "./doctor.service";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const filters = pick(req.query, doctorFilterableFields)

    const result = await DoctorService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor fetched Successfully!",
        meta: result.meta,
        data: result.data,
    })
})

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DoctorService.updateIntoDB(id, req.body);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor fetched Successfully!",
        data: result,
    })
})

const getAISuggestions = catchAsync(async (req: Request, res: Response) => {
    const result = await DoctorService.getAISuggestions(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'AI suggestions fetched successfully',
        data: result,
    });
});

export const DoctorController = {
    getAllFromDB,
    updateIntoDB,
    getAISuggestions
}
