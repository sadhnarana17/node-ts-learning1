import { Router } from 'express';
import addBook from './book/add';
import updateBook from './book/update';

const router: Router = Router();

addBook(router);
updateBook(router);

export default router;
