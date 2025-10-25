import { StatusCodes } from "http-status-codes"
import { prisma } from "../../config/db"
import AppError from "../../errorHelpers/AppError"
import { IJwtPayload } from "../../types/common"

const insertIntoDB = async (user: IJwtPayload, payload: any) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email
    }
  })

  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId
    }
  })

  if (patientData.id !== appointmentData.patientId) {
    throw new AppError(StatusCodes.BAD_REQUEST, "This is not Your appointment");
  }

  return await prisma.$transaction(async (tnx) => {
    const result = await tnx.review.create({
      data: {
        appointmentId: appointmentData.id,
        doctorId: appointmentData.doctorId,
        patientId: appointmentData.patientId,
        rating: payload.rating,
        comment: payload.comment
      }
    })

    const avgRating = await tnx.review.aggregate({
      _avg: {
        rating: true
      },
      where: {
        doctorId: appointmentData.doctorId
      }
    })

    await tnx.doctor.update({
      where: {
        id: appointmentData.doctorId
      },
      data: {
        averageRating: avgRating._avg.rating as number
      }
    })

    return result;
  })
}

export const ReviewService = {
  insertIntoDB
}