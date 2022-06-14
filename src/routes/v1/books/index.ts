import { Router } from 'express';
import getBook from './get';

const router: Router = Router();

getBook(router);

export default router;
