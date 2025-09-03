// src/slices/doctorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

// ✅ thunk لجلب بيانات الدكتور
export const fetchDoctor = createAsyncThunk(
  'doctor/fetchDoctor',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/doctor/${id}`);
      // ✅ نرجع doctor من داخل response.data.data
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  doctor: null,       // البيانات الكاملة للطبيب
  loading: false,     // حالة التحميل
  error: null,        // أي خطأ يظهر
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    clearDoctor(state) {
      state.doctor = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.doctor = null; // ✅ مسح بيانات الطبيب القديم قبل جلب الجديد
      })
      .addCase(fetchDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'حدث خطأ أثناء جلب بيانات الطبيب';
      });
  }
});

export const { clearDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
