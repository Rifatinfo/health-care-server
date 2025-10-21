import { IJwtPayload } from "../../types/common";

const createAppointment = async (user: IJwtPayload, payload: { doctorId: string, scheduleId: string }) => {

    
}
export const AppointmentService = {
    createAppointment,
};