import express, { Router } from 'express';
import * as adminController from '../controllers/admin-controller.js'
import  {allAppointments}  from '../controllers/appointments-controller.js';

const router: Router = express.Router();

router.get('/api/appointments', allAppointments);
router.put('/api/admin/update/:id', adminController.updateAppointment);
router.delete('/api/admin/delete/:id', adminController.deleteAppointment);

export { router as adminRouter};