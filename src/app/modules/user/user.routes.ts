import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { fileUploader } from "../../helper/fileUploader";
import { UserValidation } from "./user.validation";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";


const router = Router();

router.post("/create-patient", fileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data));
    return UserController.createPatient(req, res, next)
});
router.post("/create-admin", fileUploader.upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data));
    return UserController.createAdmin(req, res, next)
});

router.get("/", auth(UserRole.ADMIN), UserController.getAllFromDB);



export const UserRoute = router;
