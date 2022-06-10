import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "../features/auth/login/loginSlice";
import signupReducer from "../features/auth/signup/signupSlice";

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
  },
});
