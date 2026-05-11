import express from 'express';
import * as adminController from '../controllers/admin-controller.js'

const router = express.Router();

router.get('/api/appointments', adminController.allAppointments);
router.put('/api/appointments/update/:id', adminController.updateAppointment);
router.delete('/api/appointments/delete/:id', adminController.deleteAppointment);

export { router as adminRouter};