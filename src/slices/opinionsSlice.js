// src/slices/opinionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// ✅ إضافة رأي
export const addOpinion = createAsyncThunk(
  "opinions/addOpinion",
  async (opinionText, thunkAPI) => {
    try {
      // لازم يكون key اسمو opinion
      const response = await axios.post("/opinions", { opinion: opinionText });
      return response.data; // { data: "شكرا لاضافة رأيك", status: true, ... }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ جلب كل الآراء
export const fetchOpinions = createAsyncThunk(
  "opinions/fetchOpinions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/showOpinions");
      return response.data.data; // مصفوفة الآراء
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const opinionsSlice = createSlice({
  name: "opinions",
  initialState: {
    opinionsList: [],
    loading: false,
    error: null,
    successMessage: null, // رسالة نجاح عند إضافة رأي
  },
  reducers: {
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== إضافة رأي =====
      .addCase(addOpinion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addOpinion.fulfilled, (state, action) => {
        state.loading = false;
        // backend بيرجع { data: "شكرا لاضافة رأيك", status: true }
        state.successMessage = action.payload.data || "تم إضافة رأيك بنجاح";
      })
      .addCase(addOpinion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ أثناء إضافة الرأي";
      })
      // ===== جلب الآراء =====
      .addCase(fetchOpinions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOpinions.fulfilled, (state, action) => {
        state.loading = false;
        state.opinionsList = action.payload;
      })
      .addCase(fetchOpinions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ أثناء جلب الآراء";
      });
  },
});

export const { clearSuccessMessage } = opinionsSlice.actions;
export default opinionsSlice.reducer;
