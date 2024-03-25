import { validateErrorContexts } from '../utils/validate-error-contexts';

export const VALIDATION_ERROR_CONTEXT = {
  // Default
  DEFAULT_VALIDATION_ERROR: {
    errorCode: 10000,
    message: 'Validation error happened',
  },

  // User
  USER_ENTITY_NOT_FOUND: {
    errorCode: 10201,
    message: 'User not found',
  },
  USER_ENTITY_ALREADY_EXIST: {
    errorCode: 10202,
    message: 'User already exist',
  },
  USER_NAME_IS_NOT_STRING: {
    errorCode: 10203,
    message: 'User name should be a string',
  },
  USER_NAME_LENGTH_INVALID: {
    errorCode: 10204,
    message: 'User name length should be from 2 to 60 symbols',
  },
  USER_EMAIL_LENGTH_INVALID: {
    errorCode: 10205,
    message: 'User email length should be less than 96 symbols',
  },
  USER_EMAIL_IS_NOT_STRING: {
    errorCode: 10206,
    message: 'User email should be a string',
  },
  USER_PHONE_INVALID: {
    errorCode: 10209,
    message: 'User phone should be an string',
  },
  USER_PASSWORD_LENGTH_INVALID: {
    errorCode: 10210,
    message: 'User password should be an string in range from 5 to 20',
  },
  USER_PASSWORD_IS_NOT_STRING: {
    errorCode: 10211,
    message: 'User password should be a string',
  },
  USER_ID_IS_NOT_UUID: {
    errorCode: 10212,
    message: 'User id should be in UUID format',
  },
  USER_PHOTO_IS_NOT_STRING: {
    errorCode: 10213,
    message: 'User photo should be a string',
  },

  // FILE
  FILE_UPLOAD_PHOTO_PIPE_NO_FILE: {
    errorCode: 10301,
    message: 'File not provided in the request body',
  },
  FILE_UPLOAD_PHOTO_PIPE_INVALID_MIMETYPE: {
    errorCode: 10302,
    message: 'File should have valid mimetype: jpeg, jpg',
  },
  FILE_UPLOAD_PHOTO_PIPE_MAX_SIZE: {
    errorCode: 10303,
    message: 'File should be less than 5 Mb',
  },
  FILE_UPLOAD_PHOTO_SAVING_ERROR: {
    errorCode: 10304,
    message: 'File count not be saved',
  },
} as const;

validateErrorContexts(VALIDATION_ERROR_CONTEXT, 'Validation');
