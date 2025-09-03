// src/slices/scheduleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// ✅ Thunk لجلب مواعيد الطبيب
export const fetchDoctorSchedules = createAsyncThunk(
  "schedules/fetchDoctorSchedules",
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/doctors/${doctorId}/schedules/available`
      );

      // السيرفر بيرجع { data, status, error, statusCode }
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "فشل في جلب مواعيد الطبيب"
      );
    }
  }
);

const showAppointmentDoctor = createSlice({
  name: "schedules",
  initialState: {
    schedules: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSchedules: (state) => {
      state.schedules = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 📥 pending
      .addCase(fetchDoctorSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 📥 success
      .addCase(fetchDoctorSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      // 📥 failed
      .addCase(fetchDoctorSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSchedules } = showAppointmentDoctor.actions;
export default showAppointmentDoctor.reducer;
