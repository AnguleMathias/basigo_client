import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "../features/auth/login/loginSlice";
import signupReducer from "../features/auth/signup/signupSlice";

import leadsReducer from "../features/Leads/leadsSlice";

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    leads: leadsReducer,
  },
});
