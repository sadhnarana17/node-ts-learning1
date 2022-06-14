import { Router } from 'express';
import BookInput from '../../../../service/admin/book/type/bookInput';
import validationMiddleware from '../../../middleware/validationMiddleware';
import auth from '../../../middleware/jwtMiddleware';
import updateBook from '../../../../service/admin/book/update';
import catchAsync from '../../../../utils/catchAsync';
import HttpException from '../../../../utils/exceptions/HttpException';
import logger from '../../../../service/logger';

const route = (router: Router) => {
  router.patch(
    '/update',
    auth,
    validationMiddleware(BookInput),
    async (req: Record<string, any>, res, next) => {
      catchAsync(
        async () => {
          const book = await updateBook(req.body);
          if (book) {
            res.status(200).type('application/json').send({
              data: book,
              message: 'Book updated successfully.',
            });
          }
        },
        async (error) => {
          logger('error', `/admin/book/add: Error ${error}`, error?.stack);
          if (error instanceof HttpException) {
            next(error);
          }
          next(new HttpException(403, error.message));
        },
      )();
    },
  );
};

export default route;
