import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { AppointmentController } from "./appointment.controller";

const router = Router();

router.post(
    "/",
    auth(UserRole.PATIENT),
    AppointmentController.createAppointment
)
router.get(
    "/my-appointments",
    auth(UserRole.PATIENT, UserRole.DOCTOR),
    AppointmentController.getMyAppointment
)
router.patch(
    "/status/:id",
    auth(UserRole.ADMIN, UserRole.DOCTOR),
    AppointmentController.updateAppointmentStatus
)

export const AppointmentRouter = router;