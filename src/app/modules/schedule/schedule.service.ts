import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../config/db";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { Prisma } from "@prisma/client";

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

        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "MM/dd/yyyy")}`,
                    Number(endTime.split(":")[0]) // 11:00
                ),
                Number(endTime.split(":")[1])
            )
        )

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

const scheduleForDoctor = async (options: IOptions, filters: any) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
    const { startDateTime: filterStartDateTime, endDateTime: filterEndDataTime } = filters;

    const andConditions : Prisma.ScheduleWhereInput[] = [];

    if(filterStartDateTime && filterEndDataTime){
      andConditions.push({
        AND : [
            {
                startDateTime : {
                    gte : new Date(filterStartDateTime)
                }
            },
            {

                endDateTime : {
                    lte : new Date(filterEndDataTime)
                }
            }
        ]
      })
    }

    const whereConditions : Prisma.ScheduleWhereInput = andConditions.length > 0 ? {
        AND : andConditions
    } : {}

    const result = await prisma.schedule.findMany({
        where : whereConditions,
        skip,
        take : limit,
        orderBy : {
            [sortBy] : sortOrder
        }
    });

    const total = await prisma.schedule.count({

        where : whereConditions
    })

    return {
        meta : {
            page,
            limit,
            total
        },
        data : result
    }
}

const deleteScheduleFromDB = async(id : string) => {
    return await prisma.schedule.delete({
        where : {
            id
        }
    })
}

export const ScheduleService = {
    insertIntoDB,
    scheduleForDoctor,
    deleteScheduleFromDB
}