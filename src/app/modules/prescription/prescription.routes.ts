
import { UserRole } from '@prisma/client';
import express from 'express';
import { PrescriptionController } from './prescription.controller';
import auth from '../../middlewares/auth';

const router = express.Router();


router.post(
    "/",
    auth(UserRole.DOCTOR),
    PrescriptionController.createPrescription
);

export const PrescriptionRoutes = router;