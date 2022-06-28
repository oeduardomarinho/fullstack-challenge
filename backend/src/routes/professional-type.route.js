import express from 'express';
// eslint-disable-next-line max-len
import * as professionalTypeController from '../controllers/professional-type.controller';
// eslint-disable-next-line max-len
import { newProfessionalTypeValidator } from '../validators/professional-type.validator';
// import { userAuth } from '../middlewares/auth.middleware';
// const professionalTypeAuth = userAuth;

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
  // professionalTypeAuth,
  professionalTypeController.getProfessionalType
);

//route to update a single professionalType by their professionalType id
router.put('/:id', professionalTypeController.updateProfessionalType);

//route to delete a single professionalType by their professionalType id
router.delete('/:id', professionalTypeController.deleteProfessionalType);

export default router;
