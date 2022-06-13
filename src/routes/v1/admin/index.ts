import { Router } from 'express';
import addBook from './book';

const router: Router = Router();

addBook(router);

export default router;
