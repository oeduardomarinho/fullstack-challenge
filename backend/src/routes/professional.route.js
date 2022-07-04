import express from 'express';
// eslint-disable-next-line max-len
import * as professionalController from '../controllers/professional.controller';
// eslint-disable-next-line max-len
import {
  newProfessionalValidator,
  changeProfessionalValidator,
  professionalIdValidator
} from '../validators/professional.validator';

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
  professionalIdValidator,
  professionalController.getProfessional
);

//route to update a single professional by their professional id
router.put(
  '/:id',
  professionalIdValidator,
  changeProfessionalValidator,
  professionalController.updateProfessional
);

//route to delete a single professional by their professional id
router.delete(
  '/:id',
  professionalIdValidator,
  professionalController.deleteProfessional
);

export default router;
