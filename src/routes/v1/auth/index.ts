import { Router } from 'express';
import login from './login';

const router: Router = Router();

login(router);

export default router;
