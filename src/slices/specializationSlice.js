import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";



// ✅ جلب الاختصاصات
export const fetchSpecializations = createAsyncThunk(
  "specializations/fetchSpecializations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/specialization`);
      return response.data.data; // برجع مصفوفة الاختصاصات
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل جلب الاختصاصات"
      );
    }
  }
);

const specializationSlice = createSlice({
  name: "specializations",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecializations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecializations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // خزّن البيانات
      })
      .addCase(fetchSpecializations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default specializationSlice.reducer;
