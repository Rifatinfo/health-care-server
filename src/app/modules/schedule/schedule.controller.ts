import { Request, Response } from "express";
import { catchAsync } from "../../middlewares/catchAsync";
import { sendResponse } from "../../middlewares/sendResponse";
import { ScheduleService } from "./schedule.service";
import pick from "../../helper/pick";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ScheduleService.insertIntoDB(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Schedule Create Successfully",
        data: result
    })
})
const scheduleForDoctor = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const filter = pick(req.query, ["startDateTime", "endDateTime"]);

    const result = await ScheduleService.scheduleForDoctor(options, filter);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Schedule fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});


const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ScheduleService.deleteScheduleFromDB(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Schedule Deleted Successfully",
        data : result
    });
})


export const ScheduleController = {
    insertIntoDB,
    scheduleForDoctor,
    deleteScheduleFromDB
}