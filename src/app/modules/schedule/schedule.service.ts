import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../config/db";

const insertIntoDB = async (payload: any) => {
    const { startTime, endTime, startDate, endDate } = payload;

    const intervalTime = 30;
    const schedules = [];

    const currentDate = new Date(startDate);
    const lateDate = new Date(endDate);

    while (currentDate <= lateDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "MM/dd/yyyy")}`,
                    Number(startTime.split(":")[0])
                ),
                Number(startTime.split(":")[1])
            )
        )
        console.log(startDateTime);

        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "MM/dd/yyyy")}`,
                    Number(endTime.split(":")[0]) // 11:00
                ),
                Number(endTime.split(":")[1])
            )
        )

        console.log(endDateTime)

        while (startDateTime < endDateTime) {
            const slotStartDateTime = startDateTime;
            const slotEndDateTime = addMinutes(startDateTime, intervalTime);

            const scheduleDate = {
                startDateTime: slotStartDateTime,
                endDateTime: slotEndDateTime
            }

            const existingSchedule = await prisma.schedule.findFirst({
                where: scheduleDate
            })

            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleDate
                })
                schedules.push(result);
            }

            slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + intervalTime);
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return schedules
}

export const ScheduleService = {
    insertIntoDB
}