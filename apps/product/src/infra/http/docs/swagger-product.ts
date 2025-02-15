// infra/http/docs/swagger-product.ts
import { ApiResponseOptions } from '@nestjs/swagger';

export const schemaCreateResponseCreated: ApiResponseOptions = {
  status: 201,
  description: 'Product created successfully',
};

export const schemaCreateResponseBadRequest: ApiResponseOptions = {
  status: 400,
  description: 'Bad Request',
  example: {
    message: 'Bad Request',
    error: 'Bad Request',
    statusCode: 400,
  },
};

export const schemaGetResponseNotFound: ApiResponseOptions = {
  status: 404,
  description: 'Product not found',
  example: {
    message: 'Product not found',
    error: 'Not Found',
    statusCode: 404,
  },
};

export const schemaUpdateResponseNotFound: ApiResponseOptions = {
  status: 404,
  description: 'Product not found',
  example: {
    message: 'Product not found',
    error: 'Not Found',
    statusCode: 404,
  },
};

export const schemaUpdateResponseBadRequest: ApiResponseOptions = {
  status: 400,
  description: 'Bad Request',
  example: {
    message: 'Bad Request',
    error: 'Bad Request',
    statusCode: 400,
  },
};
