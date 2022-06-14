import { getRepository } from 'typeorm';
import catchAsync from '../../utils/catchAsync';
import logger from '../logger';
import Book from '../../database/entity/Book';

type BookInputType = {
  id: number;
  author: string;
  title: string;
  description: string;
  mode: string;
  link?: string;
};

const getBooks = (): Promise<BookInputType[]> => {
  return catchAsync(
    async () => {
      const bookRepository = getRepository(Book);
      const books = await bookRepository.find();
      return books;
    },
    async (error) => {
      logger(
        'error',
        `/books: Error ${error} when processing the request`,
        error.stack,
      );

      throw error;
    },
  )();
};

export default getBooks;
