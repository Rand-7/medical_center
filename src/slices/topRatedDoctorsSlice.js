import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';


export const fetchTopRatedDoctors = createAsyncThunk(
  'topRatedDoctors/fetchTopRatedDoctors',
  async () => {
    const response = await axios.get('/top-rated-doctors');
    return response.data.data; 
  }
);

const topRatedDoctorsSlice = createSlice({
  name: 'topRatedDoctors',
  initialState: {
    doctors: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopRatedDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload; // هنا بيصير عندك المصفوفة من الأطباء
      })
      .addCase(fetchTopRatedDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default topRatedDoctorsSlice.reducer;
