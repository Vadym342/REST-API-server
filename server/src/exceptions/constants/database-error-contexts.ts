import { validateErrorContexts } from '@src/exceptions/utils/validate-error-contexts';

export const DATABASE_ERROR_CONTEXT = {
  // Default
  DEFAULT_DATABASE_ERROR: {
    errorCode: 20000,
    message: 'Database error happened',
  },

  // User
  USER_CREATE_ONE: {
    errorCode: 20101,
    message: 'Create user entity exception',
  },
  USER_GET_ONE: {
    errorCode: 20102,
    message: 'Select one user entity exception',
  },
  USER_GET_AUTH_ONE: {
    errorCode: 20103,
    message: 'Select one auth user entity exception',
  },
  USER_GET_MANY: {
    errorCode: 20104,
    message: 'Select many user entities exception',
  },
  USER_UPDATE_ONE: {
    errorCode: 20105,
    message: 'Update user entity exception',
  },
  USER_DELETE_ONE: {
    errorCode: 20106,
    message: 'Delete user entity exception',
  },

  // Position
  POSITION_CREATE_ONE: {
    errorCode: 20201,
    message: 'Create Position entity exception',
  },
  POSITION_GET_ONE: {
    errorCode: 20202,
    message: 'Select one Position entity exception',
  },
  POSITION_GET_MANY: {
    errorCode: 20203,
    message: 'Select many Position entities exception',
  },
  POSITION_UPDATE_ONE: {
    errorCode: 20204,
    message: 'Update Position entity exception',
  },
  POSITION_DELETE_ONE: {
    errorCode: 20205,
    message: 'Delete Position entity exception',
  },
};

validateErrorContexts(DATABASE_ERROR_CONTEXT, 'Database');
