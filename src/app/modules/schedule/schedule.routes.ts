import { Router } from "express";
import { ScheduleController } from "./schedule.controller";

const router  = Router();

router.post("/", ScheduleController.insertIntoDB);
router.get("/", ScheduleController.scheduleForDoctor);
router.delete("/:id", ScheduleController.deleteScheduleFromDB);

export const ScheduleRoutes = router;
