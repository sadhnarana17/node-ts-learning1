import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import HttpException from '../../utils/exceptions/HttpException';

const validateArray = async <T extends object, TV>(
  data: TV[],
  type: new () => T,
  skipMissingProperties: boolean,
): Promise<ValidationError[][] | ValidationError[]> => {
  const errors = [];
  // eslint-disable-next-line
  for (const item of data) {
    // eslint-disable-next-line
    errors.push(
      // eslint-disable-next-line
      await validate(plainToClass(type, item), { skipMissingProperties }),
    );
  }

  return errors;
};

const getValidationChildrenErrorDetails = (errors: ValidationError[]): any => {
  return errors
    .map((v) =>
      v.children
        .filter((empty) => empty)
        .map((constraint) => constraint)
        .join(', '),
    )
    .join(',');
};

// eslint-disable-next-line
const _getValidationErrorDetails = (errors: ValidationError[]): string => {
  return errors
    .map((error) => error.constraints)
    .filter((empty) => empty)
    .map((constraint) => Object.values(constraint as { [key: string]: string }))
    .join(', ');
};

const validationMiddleware = <T extends object>(
  type: new () => T,
  skipMissingProperties = false,
  validateParams = false,
): express.RequestHandler => {
  return async (req: express.Request, _res, next) => {
    let errors = [];
    if (Array.isArray(req[validateParams ? 'params' : 'body'])) {
      errors = (await validateArray(
        req.body,
        type,
        skipMissingProperties,
      )) as ValidationError[];
    } else {
      errors = await validate(
        plainToClass(type, req[validateParams ? 'params' : 'body']),
        {
          skipMissingProperties,
        },
      );
    }

    if (errors.length === 0) {
      next();
      return;
    }

    const details = _getValidationErrorDetails(errors);

    const childrenErrors = getValidationChildrenErrorDetails(errors);
    const message = `Validation failed: ${details}${childrenErrors}`;
    next(new HttpException(400, message));
  };
};

export default validationMiddleware;
