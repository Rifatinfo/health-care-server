import { Router } from "express";
import { ScheduleController } from "./schedule.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router  = Router();

router.post("/", ScheduleController.insertIntoDB);
router.get("/", auth(UserRole.DOCTOR, UserRole.ADMIN) ,ScheduleController.scheduleForDoctor);
router.delete("/:id", ScheduleController.deleteScheduleFromDB);

export const ScheduleRoutes = router;
