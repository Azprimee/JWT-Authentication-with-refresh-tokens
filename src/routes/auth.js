import { Router } from 'express';
import AuthController from '../controllers/authController';
import passport from 'passport';
import authController from '../controllers/authController';

export default () => {
  const app = Router();

  app.post(
    '/login',
    passport.authenticate('local', { session: false }),
    authController.accesTokens
  );
  app.post('/token', authController.refreshToken);

  app.post('/reg', AuthController.register);

  return app;
};
