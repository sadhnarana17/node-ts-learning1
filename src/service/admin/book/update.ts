import { getRepository } from 'typeorm';
import HttpException from '../../../utils/exceptions/HttpException';
import Book from '../../../database/entity/Book';
import catchAsync from '../../../utils/catchAsync';
import logger from '../../logger';

type BookInputType = {
  id: number;
  author?: string;
  title?: string;
  description?: string;
  mode?: string;
  link?: string;
};

const updateBook = (requestData: BookInputType): Promise<any> => {
  return catchAsync(
    async () => {
      const bookRepository = getRepository(Book);
      const book = await bookRepository.findOne({ id: requestData.id });
      if (!book) {
        throw new HttpException(404, 'Data not found');
      }
      await bookRepository.save(requestData);
      const updatedRow = await bookRepository.findOne({
        where: { id: requestData.id },
      });
      return updatedRow;
    },
    async (error) => {
      logger(
        'error',
        `/admin/book/update/: Error ${error} when processing the request`,
        error.stack,
      );
      throw error;
    },
  )();
};

export default updateBook;
