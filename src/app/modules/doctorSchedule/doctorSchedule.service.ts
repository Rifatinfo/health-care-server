import { prisma } from "../../config/db";
import { IJwtPayload } from "../../types/common";

const insertIntoDB = async (user : IJwtPayload, payload : {
     scheduleIds : string[]
}) => {
    console.log(payload);
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where : {
            email : user.email
        }
    }) ;

     // Find only valid schedules
  const validSchedules = await prisma.schedule.findMany({
    where: { id: { in: payload.scheduleIds } },
    select: { id: true },
  });

  const validIds = validSchedules.map((s) => s.id);
  
  if (validIds.length === 0) {
    throw new Error("No valid schedule IDs found.");
  }

  // Insert only valid schedules
  const doctorScheduleData = validIds.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

   return await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
    skipDuplicates: true,
  });


}

export const DoctorScheduleService = {
    insertIntoDB
}