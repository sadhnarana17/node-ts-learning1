import { getRepository } from 'typeorm';
import catchAsync from '../../utils/catchAsync';
import User from '../../database/entity/User';
import logger from '../logger';

type AddUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class DuplicateEmail extends Error {}

const addUser = (requestData: AddUserType): Promise<any> => {
  return catchAsync(
    async () => {
      const user = getRepository(User);
      const isDuplicateEmail = user.find({ email: requestData.email });
      if (isDuplicateEmail) {
        throw new DuplicateEmail();
      }
      const result = user.create(requestData);
      const record = user.save(result);
      return record;
    },
    async (error) => {
      logger(
        'error',
        `/user/add/: Error ${error} when processing the request`,
        error.stack,
      );

      throw error;
    },
  )();
};

export default addUser;
