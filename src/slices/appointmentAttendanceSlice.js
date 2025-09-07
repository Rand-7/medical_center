// src/slices/appointmentAttendanceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// ✅ تحديث حضور المريض (attended = 1 أو 0)
export const updateAppointmentAttendance = createAsyncThunk(
  "appointments/updateAttendance",
  async ({ appointmentId, attended }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.user?.token; // ⚡ جلب التوكن من authSlice
      const response = await axios.post(
        `/appointments/${appointmentId}/attendance`,
        { attended }, // body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // JSON مثل يلي بعثتلي ياه
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "فشل تحديث الحضور" }
      );
    }
  }
);

const appointmentAttendanceSlice = createSlice({
  name: "appointmentAttendance",
  initialState: {
    loading: false,
    success: false,
    error: null,
    appointment: null,
  },
  reducers: {
    resetAttendanceState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.appointment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAppointmentAttendance.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateAppointmentAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointment = action.payload.data; // حفظ بيانات الموعد المحدث
        state.error = null;
      })
      .addCase(updateAppointmentAttendance.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "خطأ غير متوقع";
      });
  },
});

export const { resetAttendanceState } = appointmentAttendanceSlice.actions;
export default appointmentAttendanceSlice.reducer;
