import { validateErrorContexts } from '../utils/validate-error-contexts';

export const VALIDATION_ERROR_CONTEXT = {
  // Default
  DEFAULT_VALIDATION_ERROR: {
    errorCode: 10000,
    message: 'Validation error happened',
  },
} as const;

validateErrorContexts(VALIDATION_ERROR_CONTEXT, 'Validation');
