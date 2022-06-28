import express from 'express';
const router = express.Router();

import professionalTypeRoute from './professional-type.route';
import professionalRoute from './professional.route';
import userRoute from './user.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);

  router.use('/professionals', professionalRoute);
  router.use('/professional-types', professionalTypeRoute);
  return router;
};

export default routes;
