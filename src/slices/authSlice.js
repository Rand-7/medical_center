// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';
import { clearPatientData } from './patientSlice';

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

// ✅ تسجيل الدخول
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, user_type }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', { email, password, user_type });
      const { token, user } = response.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'خطأ في تسجيل الدخول');
    }
  }
);

// ✅ تسجيل الخروج
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // 🧹 نظف بيانات المريض
      dispatch(clearPatientData());

      // 🧹 مسح بيانات التوكن والمستخدم
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('medical_info');

      const successMessage = response.data.error || 'تم تسجيل الخروج بنجاح';
      return successMessage;
    } catch (error) {
      console.log('Logout error details:', error);

      // 🛑 لو الجلسة منتهية أو 401: لازم نفرغ كلشي محلي
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('medical_info');
        dispatch(clearPatientData());
        return rejectWithValue('انتهت صلاحية الجلسة. الرجاء تسجيل الدخول من جديد');
      }

      return rejectWithValue(error.response?.data?.error || 'خطأ في تسجيل الخروج');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    loading: false,
    error: null,
    logoutStatus: null,
  },
  reducers: {
    clearAuthData: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('medical_info');
    },
    clearLogoutStatus: (state) => {
      state.logoutStatus = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ تسجيل الدخول
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ تسجيل الخروج
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.logoutStatus = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.logoutStatus = action.payload; // رسالة النجاح
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;   // حتى لو فشل الخروج أو الجلسة منتهية
        state.token = null;
        state.error = action.payload;
      });
  },
});

export const { clearAuthData, clearLogoutStatus } = authSlice.actions;
export default authSlice.reducer;
