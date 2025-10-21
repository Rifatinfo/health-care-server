import { Router } from "express";
import { DoctorScheduleController } from "../doctorSchedule/doctorSchedule.controller";
import { DoctorController } from "./doctor.controller";

const router = Router();

router.get("/", DoctorScheduleController.insertIntoDB);
router.patch("/:id", DoctorScheduleController.insertIntoDB);
router.post("/suggestion", DoctorController.getAISuggestions);

export const DoctorRoutes = router;