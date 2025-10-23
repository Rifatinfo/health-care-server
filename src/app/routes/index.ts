import { Router } from "express";
import { UserRoute } from "../modules/user/user.routes";
import { AuthRouters } from "../modules/auth/auth.routes";
import { ScheduleRoutes } from "../modules/schedule/schedule.routes";
import { DoctorScheduleRoutes } from "../modules/doctorSchedule/doctorSchedule.routes";
import { SpecialtiesRoutes } from "../modules/specialties/specialties.routes";
import { DoctorRoutes } from "../modules/doctor/doctor.routes";
import { AppointmentRouter } from "../modules/appointment/appointment.routes";
import { PrescriptionRoutes } from "../modules/prescription/prescription.routes";

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
    },
    {
        path: '/specialties',
        route: SpecialtiesRoutes
    },
    {
        path: '/doctor',
        route: DoctorRoutes
    },
    {
        path: '/appointment',
        route: AppointmentRouter
    },
    {
        path: '/prescription',
        route: PrescriptionRoutes
    },
]

moduleRouters.forEach((route) => {
    router.use(route.path, route.route)
})