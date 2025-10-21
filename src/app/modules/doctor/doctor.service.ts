import { Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { doctorSearchableFields } from "./doctor.constant";
import { prisma } from "../../config/db";
import { IDoctorUpdateInput } from "./doctor.interface";
import AppError from "../../errorHelpers/AppError";
import { StatusCodes } from "http-status-codes";
import { openai } from "../../helper/askOpenRoute";
import { extractJsonFromMessage } from "../../helper/extractJsonFromMessage";

const getAllFromDB = async (filters: any, options: IOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
    const { searchTerm, specialties, ...filterData } = filters;

    const andConditions: Prisma.DoctorWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: doctorSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (specialties && specialties.length > 0) {
        andConditions.push({
            doctorSpecialties: {
                some: {
                    specialities: {
                        title: {
                            contains: specialties,
                            mode: "insensitive"
                        }
                    }
                }
            }
        })

    }

    if (Object.keys(filterData).length > 0) {
        const filterCondition = Object.keys(filterData).map((key) => ({
            [key]: {
                equals: (filterData as any)[key]
            }
        }))

        andConditions.push(...filterCondition)
    }

    const whereCondition: Prisma.DoctorWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}

    const result = await prisma.doctor.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            doctorSpecialties: {
                include: {
                    specialities: true
                }
            }
        }
    });

    const total = await prisma.doctor.count({
        where: whereCondition
    })

    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
}

const updateIntoDB = async (id: string, payload: Partial<IDoctorUpdateInput>) => {
    const doctorInfo = await prisma.doctor.findFirstOrThrow({
        where: {
            id
        }
    });

    const { specialties, ...doctorData } = payload;

    return await prisma.$transaction(async (tnx) => {
        if (specialties && specialties.length > 0) {
            const deleteSpecialtyIds = specialties.filter((specialty) => specialty.isDeleted);

            for (const specialty of deleteSpecialtyIds) {
                await tnx.doctorSpecialties.deleteMany({
                    where: {
                        doctorId: id,
                        specialitiesId: specialty.specialtyId
                    }
                })
            }


            const createSpecialtyIds = specialties.filter((specialty) => !specialty.isDeleted)

            for (const specialty of createSpecialtyIds) {
                await tnx.doctorSpecialties.create({
                    data: {
                        doctorId: id,
                        specialitiesId: specialty.specialtyId
                    }
                })
            }
        }

        const updatedData = await tnx.doctor.update({
            where: {
                id: doctorInfo.id
            },
            data: doctorData,
            include: {
                doctorSpecialties: {
                    include: {
                        specialities: true
                    }
                }
            }
        })

        return updatedData;

    })
}

const getAISuggestions = async (payload: { symptoms: string }) => {
    if (!(payload && payload.symptoms)) {
        throw new AppError(StatusCodes.BAD_REQUEST, "symptoms is required!")
    };

    const doctors = await prisma.doctor.findMany({
        where: { isDeleted: false },
        include: {
            doctorSpecialties: {
                include: {
                    specialities: true
                }
            }
        }
    });

    console.log("doctors data loaded.......\n");

    const prompt = `
    You are a medical assistant AI. Based on the patient's symptoms, suggest the top 3 most suitable doctors.
    Each doctor has specialties and years of experience.
    Only suggest doctors who are relevant to the given symptoms.

    Symptoms: ${payload.symptoms}

    Here is the doctor list (in JSON):
    ${JSON.stringify(doctors, null, 2)}

    Return your response in JSON format with full individual doctor data. 
    `;

    const completion = await openai.chat.completions.create({
        model: 'openai/gpt-4o',
        messages: [
            {
                role: "system",
                content:
                    "You are a helpful AI medical assistant that provides doctor suggestions.",
            },
            {
                role: 'user',
                content: 'What is the meaning of life?',
            },
        ],
    });

    const result = await extractJsonFromMessage(completion.choices[0].message)
    return result;

}




export const DoctorService = {
    getAllFromDB,
    updateIntoDB,
    getAISuggestions
}
