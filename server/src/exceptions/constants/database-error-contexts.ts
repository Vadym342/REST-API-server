import { validateErrorContexts } from '@src/exceptions/utils/validate-error-contexts';

export const DATABASE_ERROR_CONTEXT = {
  // Default
  DEFAULT_DATABASE_ERROR: {
    errorCode: 20000,
    message: 'Database error happened',
  },
};

validateErrorContexts(DATABASE_ERROR_CONTEXT, 'Database');
