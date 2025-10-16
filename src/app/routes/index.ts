import { Router } from "express";
import { UserRoute } from "../modules/user/user.routes";
import { AuthRouters } from "../modules/auth/auth.routes";
import { ScheduleRoutes } from "../modules/schedule/schedule.routes";

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
]

moduleRouters.forEach((route) => {
    router.use(route.path, route.route)
})