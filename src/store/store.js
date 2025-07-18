import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import registerReducer from '../slices/registerSlice';
import patientReducer from '../slices/patientSlice';
export default configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
     patient: patientReducer,
  },
});
