import express, { Router } from 'express';
import * as patientController from "../controllers/patient-controller.js";

const router: Router = express.Router();

router.post('/api/patient/create', patientController.createPatient);
router.get('/api/patient/:cf', patientController.singlePatient);

export { router as patientRouter};