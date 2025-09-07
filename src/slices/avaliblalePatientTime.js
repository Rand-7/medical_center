// src/features/slots/slotsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

// thunk لجلب الأوقات المتاحة
export const fetchAvailablePatientTime = createAsyncThunk(
  'slots/fetchAvailableSlots',
  async ({ doctorId, subSpecializationId }) => {
    const response = await axios.get(
      `/doctors/${doctorId}/subSpecializations/${subSpecializationId}/availableSlots`
    );
    return response.data.data; 
  }
);

const avaliblalePatientTime = createSlice({
  name: 'slots',
  initialState: {
    duration: null,
    range: null,
    days: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailablePatientTime.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvailablePatientTime.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.duration = action.payload.duration;
        state.range = action.payload.range;
        state.days = action.payload.days;
      })
      .addCase(fetchAvailablePatientTime.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default avaliblalePatientTime.reducer;
