// src/slices/appointmentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// 🔹 Thunk لحجز الموعد
export const bookAppointment = createAsyncThunk(
  "appointments/book",
  async ({ patient_id, doctor_id, sub_specialization_id, appointment_date, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/appointments/book",
        {
          patient_id,
          doctor_id,
          sub_specialization_id,
          appointment_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return response.data; // بيرجع { data, status, error, statusCode }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "حدث خطأ أثناء الحجز" }
      );
    }
  }
);

const takeDateSlice = createSlice({
  name: "appointment",
  initialState: {
    loading: false,
    data: null,
    error: null,
    success: false,
  },
  reducers: {
    resetAppointment: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.success = true;
        state.error = null;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل الحجز";
        state.success = false;
      });
  },
});

export const { resetAppointment } = takeDateSlice.actions;
export default takeDateSlice.reducer;
