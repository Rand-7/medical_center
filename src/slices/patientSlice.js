// src/slices/patientSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

// لجلب بيانات المريض
export const fetchPatient = createAsyncThunk('patient/fetchPatient', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/patient_by_id');
    return response.data.data;
  } catch (err) {
    return rejectWithValue('فشل تحميل بيانات المريض');
  }
});

// لتحديث بيانات المريض
export const updatePatient = createAsyncThunk('patient/updatePatient', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put('/update_patient', { data });
    return response.data;
  } catch (err) {
    return rejectWithValue('فشل تحديث البيانات');
  }
});

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
        state.updateStatus = action.payload.error?.message || 'تم التحديث بنجاح';
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.updateStatus = action.payload;
      });
  },
});

export const { clearUpdateStatus } = patientSlice.actions;
export default patientSlice.reducer;
