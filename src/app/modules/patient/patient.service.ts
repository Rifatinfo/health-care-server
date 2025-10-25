import { prisma } from "../../config/db";
import { IJwtPayload } from "../../types/common";

const updateIntoBD = async (user: IJwtPayload, payload: any) => {
    const { medicalReport, patientHeathData, ...patientData } = payload;
    const patientInfo = await prisma.patient.findUniqueOrThrow({
        where : {
            email : user.email,
            isDeleted : false
        }
    })

    return await prisma.$transaction(async (tnx) => {
        await tnx.patient.update({
            where : {
                id : patientInfo.id
            },
            data : patientData
        })

         if (patientHeathData) {
            await tnx.patientHealthData.upsert({
                where: {
                    patientId: patientInfo.id
                },
                update: patientHeathData,
                create: {
                    ...patientHeathData,
                    patientId: patientInfo.id
                }
            })
        }

        if (medicalReport) {
            await tnx.medicalReport.create({
                data: {
                    ...medicalReport,
                    patientId: patientInfo.id
                }
            })
        }

        const result = await tnx.patient.findUnique({
            where: {
                id: patientInfo.id
            },
            include: {
                patientHealthData: true,
                medicalReports: true
            }
        })
        return result;
    })
}

export const PatientService = {
    updateIntoBD
}