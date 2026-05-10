import express from 'express';
import * as patientController from "../controllers/patient-controller.js";

const router = express.Router();

router.post('/api/patient/create', patientController.createPatient);

export { router as patientRouter};