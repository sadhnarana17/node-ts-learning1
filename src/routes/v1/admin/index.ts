import { Router } from 'express';
import addBook from './book/add';

const router: Router = Router();

addBook(router);

export default router;
