// src/slices/doctorsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// 🟢 Fetch doctors by specialization
export const fetchDoctorsBySpecialization = createAsyncThunk(
  "doctors/fetchBySpecialization",
  async (specializationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://medical_center.test/api/doctors/by-specialization/${specializationId}`
      );
      return response.data.data; // نجيب فقط المصفوفة اللي فيها الأطباء
    } catch (error) {
      return rejectWithValue(error.response?.data || "حدث خطأ");
    }
  }
);

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearDoctors: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorsBySpecialization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsBySpecialization.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDoctorsBySpecialization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل في جلب الأطباء";
      });
  },
});

export const { clearDoctors } = doctorsSlice.actions;
export default doctorsSlice.reducer;
