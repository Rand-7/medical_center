// src/slices/subSpecializationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// ✅ جلب التخصصات الفرعية حسب specialization_id
export const fetchSubSpecializations = createAsyncThunk(
  "subSpecializations/fetchSubSpecializations",
  async (specializationId, { rejectWithValue }) => {
    try {
      console.log("Fetching sub-specializations for specialization ID:", specializationId);
      const response = await axios.get(`/sub-specializations/by-specialization/${specializationId}`);
      
      // نرجع فقط مصفوفة الـ data
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "فشل في جلب التخصصات الفرعية");
    }
  }
);

const subSpecializationSlice = createSlice({
  name: "subSpecializations",
  initialState: {
    list: [],        // ✅ هنا نخزن البيانات
    loading: false,
    error: null,
  },
  reducers: {
    // تفريغ البيانات عند الحاجة
    clearSubSpecializations: (state) => {
      state.list = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubSpecializations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubSpecializations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload; // ✅ نملأ list بالبيانات
      })
      .addCase(fetchSubSpecializations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubSpecializations } = subSpecializationSlice.actions;
export default subSpecializationSlice.reducer;
