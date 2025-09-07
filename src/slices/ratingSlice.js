import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';


export const rateAppointment = createAsyncThunk(
  'rating/rateAppointment',
  async ({ appointmentId, rating, comment, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/appointments/${appointmentId}/rate`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'حدث خطأ أثناء إرسال التقييم'
      );
    }
  }
);

const ratingSlice = createSlice({
  name: 'rating',
  initialState: {
    ratingData: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearRatingStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(rateAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(rateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.ratingData = action.payload;
        state.success = true;
      })
      .addCase(rateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearRatingStatus } = ratingSlice.actions;
export default ratingSlice.reducer;
