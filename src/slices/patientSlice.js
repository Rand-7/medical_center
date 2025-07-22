// src/slices/patientSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

// ✅ جلب بيانات المريض باستخدام GET بعد تعديل الـ API
export const fetchPatient = createAsyncThunk(
  "patient/fetchPatient",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("غير مصرح");

    try {
      const response = await axios.get(`/patient/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (err) {
      console.error('❌ خطأ في جلب بيانات المريض:', err.response?.data || err.message);
      return rejectWithValue('فشل تحميل بيانات المريض');
    }
  }
);

// ✅ لتحديث بيانات المريض
export const updatePatient = createAsyncThunk(
  'patient/updatePatient',
  async (data, { rejectWithValue }) => {
    try {
      const { id, ...updateData } = data;
      const response = await axios.post(`/patient/update/${id}`, updateData);
      return response.data;
    } catch (err) {
      console.error('❌ خطأ في تحديث بيانات المريض:', err.response?.data || err.message);
      return rejectWithValue('فشل تحديث البيانات');
    }
  }
);

const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    data: null,
    loading: false,
    error: null,
    updateStatus: null,
  },
  reducers: {
    clearUpdateStatus: (state) => {
      state.updateStatus = null;
    },

    // ⭐ أضفنا هذا:
    clearPatientData: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.updateStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePatient.fulfilled, (state, action) => {
        state.updateStatus = action.payload.error?.message || 'تم التحديث بنجاح';
        if (action.payload.data) {
          state.data = action.payload.data;
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.updateStatus = action.payload;
      });
  },
});

// ⭐ صدريها:
export const { clearUpdateStatus, clearPatientData } = patientSlice.actions;
export default patientSlice.reducer;
