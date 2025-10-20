import { Router } from "express";
import { DoctorScheduleController } from "../doctorSchedule/doctorSchedule.controller";

const router = Router();

router.get("/", DoctorScheduleController.insertIntoDB);
router.patch("/:id", DoctorScheduleController.insertIntoDB);

export const DoctorRoutes = router;