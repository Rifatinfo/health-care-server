import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/", auth(UserRole.PATIENT))

export const AppointmentRouter = router;