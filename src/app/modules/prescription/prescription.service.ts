import { AppointmentStatus, PaymentStatus, Prescription, UserRole } from "@prisma/client";
import { IJwtPayload } from "../../types/common";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import { StatusCodes } from "http-status-codes";

const createPrescription = async (user: IJwtPayload, payload: Partial<Prescription>) => {
    const appointmentData = await prisma.appointment.findUniqueOrThrow({
        where: {
            id: payload.appointmentId,
            status: AppointmentStatus.COMPLETED,
            paymentStatus: PaymentStatus.PAID
        },
        include: {
            doctor: true
        }
    })

    if (user.role === UserRole.DOCTOR) {
        if (!(user.email === appointmentData.doctor.email)) {
            throw new AppError(StatusCodes.BAD_REQUEST, "This is not your appointment");
        }
    }

    const result = await prisma.prescription.create({
        data : {
            appointmentId : appointmentData.id,
            doctorId : appointmentData.doctorId,
            patientId : appointmentData.patientId,
            instructions : payload.instructions as string,
            followUpDate : payload.followUpDate || null
        },
        include : {
            patient : true
        }
    });

    return result;
}

export const PrescriptionService = {
    createPrescription
}