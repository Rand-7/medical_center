import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios"; // لازم يكون axios فيه baseURL جاهز

// ✅ thunk لإضافة جدول جديد للطبيب
export const addDoctorSchedule = createAsyncThunk(
  "doctorSchedule/createDoctorSchedule",
  async ({ token, scheduleData }, thunkAPI) => {
    try {
      const response = await axios.post(
        "/doctor-schedules",
        scheduleData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // إضافة التوكين للـ header
          },
        }
      );

      return response.data; // بيرجع كامل الرد
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const initialState = {
  schedule: null,       // آخر جدول مضاف
  loading: false,       // حالة التحميل
  error: null,          // أي خطأ
  successMessage: null, // رسالة نجاح من الـ API
};

const scheduleSLice = createSlice({
  name: "doctorSchedule",
  initialState,
  reducers: {
    clearScheduleState(state) {
      state.schedule = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDoctorSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addDoctorSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload.data || null; // الـ data من الرد
        state.successMessage = action.payload.error || "تمت العملية بنجاح";
      })
      .addCase(addDoctorSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "حدث خطأ أثناء الإضافة";
      });
  },
});

export const { clearScheduleState } = scheduleSLice.actions;
export default scheduleSLice.reducer;
