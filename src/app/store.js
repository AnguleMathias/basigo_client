import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "../features/auth/login/loginSlice";
import signupReducer from "../features/auth/signup/signupSlice";
import leadsReducer from "../features/leads/leadsSlice";
import customersReducer from "../features/customers/customersSlice";
import productReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    leads: leadsReducer,
    customers: customersReducer,
    products: productReducer,
  },
});
