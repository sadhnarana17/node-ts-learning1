import { Router } from 'express';
import auth from '../../middleware/jwtMiddleware';
import getBook from '../../../service/books/get';
import catchAsync from '../../../utils/catchAsync';
import HttpException from '../../../utils/exceptions/HttpException';
import logger from '../../../service/logger';

const route = (router: Router) => {
  router.get('/', auth, async (req: Record<string, any>, res, next) => {
    catchAsync(
      async () => {
        const books = await getBook();
        if (books) {
          res.status(200).type('application/json').send({
            data: books,
            message: 'Records fetched successfully.',
          });
        }
      },
      async (error) => {
        logger('error', `/books: Error ${error}`, error?.stack);
        if (error instanceof HttpException) {
          next(error);
        }
        next(new HttpException(403, error.message));
      },
    )();
  });
};

export default route;
