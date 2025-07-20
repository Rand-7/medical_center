import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import registerReducer from '../slices/registerSlice';
import patientReducer from '../slices/patientSlice';
import doctorReducer from '../slices/doctorSlice';
export default configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
     patient: patientReducer,
     doctor: doctorReducer,
  },
});
