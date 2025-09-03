// src/slices/appointmentsByStatusSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// ✅ AsyncThunk لجلب المواعيد حسب الحالة
export const fetchAppointmentsByStatus = createAsyncThunk(
  "appointments/fetchByStatus",
  async ({ doctorId, status, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/doctors/${doctorId}/appointments/status/${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      return { status, data: response.data.data };
    } catch (err) {
      if (err.response) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);

const appointmentsByStatusSlice = createSlice({
  name: "appointmentsByStatus",
  initialState: {
    appointments: {
      pending: [],
      confirmed: [],
      cancelled: [],
      completed: [],
      no_show: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
    resetAppointmentsState: (state) => {
      state.appointments = {
        pending: [],
        confirmed: [],
        cancelled: [],
        completed: [],
        no_show: [],
      };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentsByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentsByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments[action.payload.status] = action.payload.data;
      })
      .addCase(fetchAppointmentsByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل جلب المواعيد";
      });
  },
});

export const { resetAppointmentsState } = appointmentsByStatusSlice.actions;
export default appointmentsByStatusSlice.reducer;
