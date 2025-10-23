import { StatusCodes } from "http-status-codes"
import { prisma } from "../../config/db"
import AppError from "../../errorHelpers/AppError"
import { IJwtPayload } from "../../types/common"

const insertIntoDB = async (user : IJwtPayload, payload : any) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where : {
        email : user.email
    }
  })

  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where : {
        id : payload.appointmentId
    }
  })

  if(patientData.id !== appointmentData.patientId){
    throw new AppError(StatusCodes.BAD_REQUEST, "This is not Your appointment");
  }
}

export const ReviewService = {
    insertIntoDB
}