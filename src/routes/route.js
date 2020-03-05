import { Router } from 'express';
export default () => {
  const app = Router();

  app.get('/', (req, res) => {
    res.json('Hello world');
  });

  return app;
};
