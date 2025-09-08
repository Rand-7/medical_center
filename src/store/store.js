import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import registerReducer from '../slices/registerSlice';
import patientReducer from '../slices/patientSlice';
import doctorReducer from '../slices/doctorSlice';
import scheduleReducer from '../slices/scheduleSlice';
import subSpecializationReducer from '../slices/subSpecializationSlice';
import specializationReducer from "../slices/specializationSlice";
import doctorsReducer from "../slices/doctorsSlice";
import appointmentsReducer from '../slices/appointmentsSlice';
import opinionsReducer from "../slices/opinionsSlice";
import showAppointmentDoctorReducer from "../slices/showAppointmentDoctor"
import  reportseReducer from "../slices/reportsSlice"
import avalibleDoctorTimeReducer from "../slices/avalibaleDoctorTime"
import takedateReducer from "../slices/takeDateSlice"
import updateScheduleReducer from "../slices/updateScheduleSlice";
import appointmentsByStatusReducer from "../slices/appointmentsByStatusSlice";
import appointmentAttendanceReducer from "../slices/appointmentAttendanceSlice";
import avaliblePatientTimeReducer from "../slices/avaliblalePatientTime";
import topRatedDoctorsReducer from "../slices/topRatedDoctorsSlice";
import ratingReducer from"../slices/ratingSlice"
export default configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    patient: patientReducer,
    doctor: doctorReducer,
    schedules: scheduleReducer,
    subSpecializations: subSpecializationReducer,
    specializations: specializationReducer,
    doctors: doctorsReducer,
    appointments: appointmentsReducer, 
      opinions: opinionsReducer,
      showAppointmentDoctor:showAppointmentDoctorReducer,
       reportsSlice:reportseReducer,
       avalibleSlice:avalibleDoctorTimeReducer,
       takedate:takedateReducer,
       updateSchedule: updateScheduleReducer,
   appointmentsByStatus: appointmentsByStatusReducer,
   appointmentAttendance: appointmentAttendanceReducer,
   avaliblePatientSlice: avaliblePatientTimeReducer, 
   topRatedDoctors : topRatedDoctorsReducer,
   ratingSlice:ratingReducer,
  },
});
