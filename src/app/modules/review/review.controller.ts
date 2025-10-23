import { Request, Response } from "express";
import { catchAsync } from "../../middlewares/catchAsync";
import { IJwtPayload } from "../../types/common";
import { ReviewService } from "./review.service";
import { sendResponse } from "../../middlewares/sendResponse";

const insertIntoDB = catchAsync(async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const user = req.user;
    const result = await ReviewService.insertIntoDB(user as IJwtPayload, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Review created successfully!",
        data: result
    });
})

export const ReviewController = {
    insertIntoDB
}