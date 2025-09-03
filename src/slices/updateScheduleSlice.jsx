// src/slices/updateScheduleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

export const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  async ({ scheduleId, data, token }, { rejectWithValue }) => {
    try {
      // 🔹 إزالة الثواني إذا موجودة
      const formatTime = (time) => time?.slice(0, 5); // "14:00:00" => "14:00"

      const response = await axios.post(
        `/doctor-schedules/${scheduleId}/update`,
        {
          start_time: formatTime(data.start_time),
          end_time: formatTime(data.end_time),
          day: data.day,
          is_available: data.is_available,
          sub_specialization_id: data.sub_specialization_id, // ✅ إضافة الحقل الجديد
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error("❌ خطأ أثناء تحديث الجدول:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || "حدث خطأ أثناء التحديث");
    }
  }
);

const updateScheduleSlice = createSlice({
  name: "updateSchedule",
  initialState: {
    schedule: null,
    loading: false,
    error: null,
    success: false,
    message: null,
  },
  reducers: {
    resetUpdateState: (state) => {
      state.schedule = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload.data; // ✅ هاد فيه sub_specialization_id
        state.success = true;
        state.message = action.payload.error; // "تم تعديل الجدول بنجاح"
      })
      .addCase(updateSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "فشل التحديث";
        state.success = false;
      });
  },
});

export const { resetUpdateState } = updateScheduleSlice.actions;
export default updateScheduleSlice.reducer;
