import express from 'express';
// eslint-disable-next-line max-len
import * as professionalController from '../controllers/professional.controller';
// eslint-disable-next-line max-len
import { newProfessionalValidator } from '../validators/professional.validator';
// import { userAuth } from '../middlewares/auth.middleware';
// const professionalAuth = userAuth;

const router = express.Router();

//route to get all professionals
router.get('', professionalController.getAllProfessionals);

//route to create a new professional
router.post(
  '',
  newProfessionalValidator,
  professionalController.newProfessional
);

//route to get a single professional by their professional id
router.get(
  '/:id',
  // professionalAuth,
  professionalController.getProfessional
);

//route to update a single professional by their professional id
router.put('/:id', professionalController.updateProfessional);

//route to delete a single professional by their professional id
router.delete('/:id', professionalController.deleteProfessional);

export default router;
