import { Router } from 'express';
import catchAsync from '../../../utils/catchAsync';
import HttpException from '../../../utils/exceptions/HttpException';
import logger from '../../../service/logger';
import Authenticate from '../../../service/user/type/authenticate';
import validationMiddleware from '../../middleware/validationMiddleware';
import authenticate, {
  EmptyUserCredentails,
  InvalidUserCrendentails,
} from '../../../service/user/authenticate';

const route = (router: Router): void => {
  router.post(
    '/login',
    validationMiddleware(Authenticate),
    async (req: Record<string, any>, res, next) => {
      catchAsync(
        async () => {
          const user = await authenticate(req.body);
          if (user) {
            res.status(200).type('application/json').send({
              success: true,
              data: user,
              message: 'User logged in successfully.',
            });
          }
        },
        async (error) => {
          logger('error', `/v1/auth/login: Error ${error}`, error?.stack);
          if (error instanceof HttpException) {
            next(error);
          }

          if (error instanceof EmptyUserCredentails) {
            next(new HttpException(400, 'Please enter required credentials'));
          }

          if (error instanceof InvalidUserCrendentails) {
            next(new HttpException(400, 'Invalid crendetails provided'));
          }

          next(new HttpException(403, error.message));
        },
      )();
    },
  );
};

export default route;
