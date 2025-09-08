import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";


export const fetchDoctorRating = createAsyncThunk(
  "doctorRatings/fetchDoctorRating",
  async ({ doctorId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/doctors/${doctorId}/average-rating`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.status) {
        throw new Error(response.data.error || "فشل في جلب تقييم الدكتور");
      }

      return response.data.data; // { doctor_id, average_rating }
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const doctorRatingsSlice = createSlice({
  name: "doctorRatings",
  initialState: {
    rating: null, // { doctor_id, average_rating }
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorRating.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorRating.fulfilled, (state, action) => {
        state.loading = false;
        state.rating = action.payload;
      })
      .addCase(fetchDoctorRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doctorRatingsSlice.reducer;
