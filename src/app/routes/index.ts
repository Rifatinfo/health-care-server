import { Router } from "express";
import { UserRoute } from "../modules/user/user.routes";
import { AuthRouters } from "../modules/auth/auth.routes";
import { ScheduleRoutes } from "../modules/schedule/schedule.routes";
import { DoctorScheduleRoutes } from "../modules/doctorSchedule/doctorSchedule.routes";

export const router = Router();

const moduleRouters = [
    {
        path : "/user",
        route : UserRoute
    },
    {
        path : "/auth",
        route : AuthRouters
    },
    {
        path : "/schedule",
        route : ScheduleRoutes
    },
    {
        path : "/doctor-schedule",
        route : DoctorScheduleRoutes
    }
]

moduleRouters.forEach((route) => {
    router.use(route.path, route.route)
})