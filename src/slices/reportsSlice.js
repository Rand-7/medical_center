// src/slices/reportsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

// ✅ إضافة تقرير جديد
export const addReport = createAsyncThunk(
  "reports/addReport",
  async ({ patient_id, content, doctor_id }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        "/reports",
        { patient_id, content, doctor_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { error: "فشل في إضافة التقرير" }
      );
    }
  }
);

// ✅ جلب تقارير مريض محدد
export const fetchPatientReports = createAsyncThunk(
  "reports/fetchPatientReports",
  async (patientId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`/patients/${patientId}/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // { data: [...], status: true, error: "", statusCode: 200 }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { error: "فشل في جلب تقارير المريض" }
      );
    }
  }
);

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    reports: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetReportState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ➕ إضافة تقرير
      .addCase(addReport.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addReport.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.reports.push(action.payload.data);
      })
      .addCase(addReport.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.error || "خطأ غير متوقع";
      })

      // 📥 جلب تقارير مريض
      .addCase(fetchPatientReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data; // نبدلها بالبيانات القادمة من السيرفر
      })
      .addCase(fetchPatientReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "خطأ غير متوقع";
      });
  },
});

export const { resetReportState } = reportsSlice.actions;
export default reportsSlice.reducer;
