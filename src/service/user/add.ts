import { getRepository } from 'typeorm';
import catchAsync from '../../utils/catchAsync';
import User from '../../database/entity/User';
import logger from '../logger';
import jwtSign from '../../utils/jwtSign';

type AddUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  token: string | null;
};

export class DuplicateEmail extends Error {}

const addUser = (requestData: AddUserType): Promise<any> => {
  return catchAsync(
    async () => {
      const user = getRepository(User);
      const isDuplicateEmail = await user.findOne({ email: requestData.email });
      if (isDuplicateEmail) {
        throw new DuplicateEmail();
      }
      const result = user.create(requestData);
      const token = jwtSign({
        id: (await result).userId,
        email: (await result).email,
      });
      result.token = token;
      user.save(result);
      return {
        ...result,
        token,
      };
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
