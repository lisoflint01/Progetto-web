import express from 'express';
import * as appointmentsController from '../controllers/appointments-controller.js'

const router = express.Router();

router.get('/api/appointments', appointmentsController.allAppointments);
router.get('/api/appointments/create', appointmentsController.createAppointment);
router.get('/api/appointments/update/:id', appointmentsController.updateAppointment);
router.get('/api/appointments/delete/:id', appointmentsController.deleteAppointment);

export { router as appointmentsRouter};