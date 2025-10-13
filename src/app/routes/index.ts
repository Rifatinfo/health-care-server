import { Router } from "express";
import { UserRoute } from "../modules/user/user.routes";
import { AuthRouters } from "../modules/auth/auth.routes";

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
]

moduleRouters.forEach((route) => {
    router.use(route.path, route.route)
})