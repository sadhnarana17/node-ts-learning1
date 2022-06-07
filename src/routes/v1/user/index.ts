import { Router } from 'express';
import addUser from './add';

const router: Router = Router();

addUser(router);

export default router;
