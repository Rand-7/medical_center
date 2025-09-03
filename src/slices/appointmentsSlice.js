// src/slices/appointmentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

// ✅ thunk لجلب مواعيد المريض مع التوكين
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (patientId, thunkAPI) => {
    try {
      // جلب التوكين من localStorage
      const token = localStorage.getItem('token');

      const response = await axios.get(`/patients/${patientId}/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ إضافة التوكين
        },
      });

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAppointments(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'حدث خطأ أثناء جلب المواعيد';
      });
  },
});

export const { clearAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
