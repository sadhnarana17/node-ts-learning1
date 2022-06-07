import { Router } from 'express';
import catchAsync from '../../../utils/catchAsync';
import HttpException from '../../../utils/exceptions/HttpException';
import logger from '../../../service/logger';
import UserInputs from '../../../service/user/type/userInputs';
import validationMiddleware from '../../middleware/validationMiddleware';
import addUser, { DuplicateEmail } from '../../../service/user/add';

const route = (router: Router): void => {
  router.post(
    '/add',
    validationMiddleware(UserInputs),
    async (req: Record<string, any>, res, next) => {
      catchAsync(
        async () => {
          const user = await addUser(req.body);
          if (user) {
            res.status(200).type('application/json').send({
              data: user,
              message: 'User added successfully.',
            });
          }
        },
        async (error) => {
          logger('error', `/v1/user/add/: Error ${error}`, error?.stack);
          if (error instanceof HttpException) {
            next(error);
          }

          if (error instanceof DuplicateEmail) {
            next(new HttpException(422, 'Email already exist'));
          }
          next(new HttpException(403, error.message));
        },
      )();
    },
  );
};

export default route;
