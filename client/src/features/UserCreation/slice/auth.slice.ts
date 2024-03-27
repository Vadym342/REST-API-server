import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserResponseDataType } from "../types/user.types";

export interface AuthStateType {
  user: UserResponseDataType | null;
  isAuth: boolean;
  checkerForm: boolean;
}

const initialState = {
  user: null,
  isAuth: false,
  checkerForm: false,
} as AuthStateType;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserResponseDataType>) => {
      state.user = action.payload;
      state.isAuth = true;
    },

    logOut: (state) => {
      state.isAuth = false;
      state.user = null;
    },

    setCheckerForm: (state, action: PayloadAction<boolean>) => {
      state.checkerForm = action.payload;
    },
  },
});

export const { login, logOut, setCheckerForm } = authSlice.actions;

export default authSlice.reducer;
