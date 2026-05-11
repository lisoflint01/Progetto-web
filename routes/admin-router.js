import express from 'express';
import * as adminController from '../controllers/admin-controllers.js'

const router = express.Router();

router.get('/api/appointments', adminController.allAppointments);
router.get('/api/appointments/update/:id', adminController.updateAppointment);
router.get('/api/appointments/delete/:id', adminController.deleteAppointment);

export { router as adminRouter};