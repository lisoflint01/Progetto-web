import express from 'express';
import * as appointmentsController from '../controllers/appointments-controller.js'

const router = express.Router();

router.get('/api/appointments', appointmentsController.allAppointments);
router.get('/api/appointments/create', appointmentsController.createAppointment);

export { router as appointmentsRouter};