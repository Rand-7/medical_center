// src/slices/scheduleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// 1️⃣ إنشاء thunk لجلب المواعيد حسب doctorId
export const fetchDoctorSchedules = createAsyncThunk(
  "schedules/fetchDoctorSchedules",
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/doctors/${doctorId}/schedules/available`
      );
      return response.data.data; // البيانات داخل data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "حدث خطأ أثناء جلب المواعيد"
      );
    }
  }
);

// 2️⃣ إنشاء slice
const avalibaleDoctorTime = createSlice({
  name: "schedules",
  initialState: {
    schedules: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSchedules: (state) => {
      state.schedules = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchDoctorSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSchedules } = avalibaleDoctorTime.actions;
export default avalibaleDoctorTime.reducer;
