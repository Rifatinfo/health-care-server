import { Router } from "express";
import { UserRoute } from "../modules/user/user.routes";

export const router = Router();

const moduleRouters = [
    {
        path : "/user",
        route : UserRoute
    }
]

moduleRouters.forEach((route) => {
    router.use(route.path, route.route)
})