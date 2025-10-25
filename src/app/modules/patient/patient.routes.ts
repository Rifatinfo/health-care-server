import { UserRole } from '@prisma/client';
import express from 'express';
import { PatientController } from './patient.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.patch(
    '/',
    auth(UserRole.PATIENT),
    PatientController.updateIntoBD
);


export const PatientRoutes = router;