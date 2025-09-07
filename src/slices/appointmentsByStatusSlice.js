// src/slices/appointmentsByStatusSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// ✅ جلب المواعيد حسب الحالة
export const fetchAppointmentsByStatus = createAsyncThunk(
  "appointments/fetchByStatus",
  async ({ doctorId, status }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth?.user?.token; // ⚡ جلب التوكن من authSlice
      const response = await axios.get(
        `/doctors/${doctorId}/appointments/status/${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // بيرجع JSON مثل يلي عطيتني ياه
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "فشل جلب المواعيد حسب الحالة" }
      );
    }
  }
);

const appointmentsByStatusSlice = createSlice({
  name: "appointmentsByStatus",
  initialState: {
    loading: false,
    error: null,
    appointments: {},
    statusMessage: null,
  },
  reducers: {
    resetAppointmentsByStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.appointments = {};
      state.statusMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentsByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.statusMessage = null;
      })
      .addCase(fetchAppointmentsByStatus.fulfilled, (state, action) => {
        state.loading = false;
        const status=action.meta.arg.status;

        state.appointments[status] = action.payload.data || [];
        state.statusMessage = action.payload.error || null; // "قائمة المواعيد حسب الحالة"
        state.error = null;
      })
      .addCase(fetchAppointmentsByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "خطأ غير متوقع";
        state.statusMessage = null;
      });
  },
});

export const { resetAppointmentsByStatus } = appointmentsByStatusSlice.actions;
export default appointmentsByStatusSlice.reducer;
