export type LoginUserEntityType = {
  id: string;
  email: string;
};

export type UserEntityResponseType = {
  id: string;
  token: string;
};

export type AuthorizationUserResponseType = {
  id: string;
  email: string;
  token: string;
};

export type LoginUserBodyType = {
  email: string;
  password: string;
};

export enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type GetListUsersOptions = {
  page?: number;
  count?: number;
  offset?: number;
  sortDirection?: SORT_ORDER;
};
