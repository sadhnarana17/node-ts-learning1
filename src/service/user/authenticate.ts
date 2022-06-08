/* eslint-disable max-classes-per-file */
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import User from '../../database/entity/User';
import jwtSign from '../../utils/jwtSign';
import catchAsync from '../../utils/catchAsync';
import logger from '../logger';

type RequestBodyType = {
  email: string;
  password: string;
};

type UserData = {
  id: number;
  userId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string | null;
};

type ReturnType = UserData & {
  token: string;
};

export class EmptyUserCredentails extends Error {}
export class InvalidUserCrendentails extends Error {}

const authenticate = (requestData: RequestBodyType): Promise<ReturnType> => {
  return catchAsync(
    async () => {
      const { email, password } = requestData;
      if (!email || !password) {
        throw new EmptyUserCredentails();
      }
      const userRepository = getRepository(User);
      const user = (await userRepository.findOne({
        email,
      })) as unknown as UserData;
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new InvalidUserCrendentails();
      }

      const token = jwtSign({ userId: user.userId, email });
      user.token = token;
      userRepository.save(user);
      delete user.password;
      return {
        ...user,
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

export default authenticate;
