import express from 'express';
// eslint-disable-next-line max-len
import * as professionalTypeController from '../controllers/professional-type.controller';
// eslint-disable-next-line max-len
import {
  newProfessionalTypeValidator,
  changeProfessionalTypeValidator,
  professionalTypeIdValidator
} from '../validators/professional-type.validator';

const router = express.Router();

//route to get all professionalTypes
router.get('', professionalTypeController.getAllProfessionalTypes);

//route to create a new professionalType
router.post(
  '',
  newProfessionalTypeValidator,
  professionalTypeController.newProfessionalType
);

//route to get a single professionalType by their professionalType id
router.get(
  '/:id',
  professionalTypeIdValidator,
  professionalTypeController.getProfessionalType
);

//route to update a single professionalType by their professionalType id
router.put(
  '/:id',
  professionalTypeIdValidator,
  changeProfessionalTypeValidator,
  professionalTypeController.updateProfessionalType
);

//route to delete a single professionalType by their professionalType id
router.delete(
  '/:id',
  professionalTypeIdValidator,
  professionalTypeController.deleteProfessionalType
);

export default router;
