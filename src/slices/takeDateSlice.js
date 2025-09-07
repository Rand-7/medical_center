
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios";

export const bookAppointment = createAsyncThunk(
  "appointments/bookAppointment",
  async ({ doctor_id, patient_id, sub_specialization_id, appointment_date }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/appointments/book", {
        doctor_id,
        patient_id,
        sub_specialization_id,
        appointment_date,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "فشل الحجز");
    }
  }
);

const takeDateSlice = createSlice({
  name: "appointments",
  initialState: {
    booking: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.booking = action.payload.data;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default takeDateSlice.reducer;
