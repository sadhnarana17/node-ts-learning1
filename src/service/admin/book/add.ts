import { getRepository } from 'typeorm';
import Book from '../../../database/entity/Book';
import catchAsync from '../../../utils/catchAsync';
import logger from '../../logger';

type BookInputType = {
  author: string;
  title: string;
  description: string;
  mode: string;
  link?: string;
};

const addBook = (requestData: BookInputType): Promise<any> => {
  return catchAsync(
    async () => {
      const bookRepository = getRepository(Book);
      const book = bookRepository.create(requestData);
      bookRepository.save(book);
      return book;
    },
    async (error) => {
      logger(
        'error',
        `/admin/book/add/: Error ${error} when processing the request`,
        error.stack,
      );
      throw error;
    },
  )();
};

export default addBook;
