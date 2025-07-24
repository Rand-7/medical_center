import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

// ✅ جلب بيانات المريض حسب ID
export const fetchPatientById = createAsyncThunk(
  'patient/fetchPatientById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/patient/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'حدث خطأ');
    }
  }
);

// ✅ تعديل بيانات المريض باستخدام POST
export const updatePatient = createAsyncThunk(
  'patient/updatePatient',
  async ({ id, patientData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/patient/update/${id}`, patientData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'فشل في تعديل البيانات');
    }
  }
);

// ✅ slice
const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    patient: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPatientData: (state) => {
      state.patient = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ حالات جلب بيانات المريض
      .addCase(fetchPatientById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientById.fulfilled, (state, action) => {
        state.loading = false;
        state.patient = action.payload;
      })
      .addCase(fetchPatientById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'فشل في جلب البيانات';
      })

      // ✅ حالات تعديل بيانات المريض
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patient = action.payload;
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'فشل في تعديل البيانات';
      });
  },
});

export const { clearPatientData } = patientSlice.actions;
export default patientSlice.reducer;
