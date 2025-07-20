// src/slices/patientSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

// ✅ لجلب بيانات المريض باستخدام GET
export const fetchPatient = createAsyncThunk(
  'patient/fetchPatient',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/patient/${id}`);
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
      const { uuid, ...updateData } = data;
      const response = await axios.post(`/patient/update/${uuid}`, updateData);
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
        // حسب الـ API، رسالة النجاح تحت error.message رغم status=true
        state.updateStatus = action.payload.error?.message || 'تم التحديث بنجاح';

        // ممكن تحدث بيانات المريض بالبيانات الجديدة (حسب الحاجة)
        if(action.payload.data) {
          state.data = action.payload.data;
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.updateStatus = action.payload;
      });
  },
});

export const { clearUpdateStatus } = patientSlice.actions;
export default patientSlice.reducer;
