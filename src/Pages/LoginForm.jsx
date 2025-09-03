// src/Pages/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  TextField, Button, Grid, Box, Typography, IconButton,
  InputAdornment, Alert, CircularProgress, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import man from '../assets/img/man.jpg';
import girl from '../assets/img/girl.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';

// ✅ Schema validation
const schema = yup.object({
  email: yup.string().email('البريد الإلكتروني غير صحيح').required('البريد الإلكتروني مطلوب'),
  password: yup.string().min(6, 'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل').required('كلمة المرور مطلوبة'),
  user_type: yup.string().oneOf(['patient', 'doctor'], 'الرجاء اختيار نوع المستخدم').required('نوع المستخدم مطلوب')
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '', user_type: '' }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(man);
  const [fade, setFade] = useState(true);

  const { loading, error, token, user } = useSelector((state) => state.auth);
  const user_type = useSelector((state) => state.auth);

  // ✅ تبديل الصور كل 5 ثوانٍ
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage(prev => (prev === man ? girl : man));
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ التنقل بعد تسجيل الدخول بناءً على نوع المستخدم
  useEffect(() => {
     console.log("💡 user داخل useEffect:", user);
    if (token && user) {
      if (user.user_type === 'doctor') {
         
        navigate('/doctor-dashboard');
      } else {
        navigate('/home'); // أو '/patient-profile' حسب المسار يلي عندك
      }
    }
  }, [token, user, user_type, navigate]);

  const handleClickShowPassword = () => setShowPassword(prev => !prev);

  const onSubmit = (data) => {
    dispatch(loginUser(data)); // { email, password, user_type }
    
  };

  return (
    <Box sx={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #77B6E0, #1E3A5F)', p: 2
    }}>
      <Box sx={{
        width: '60%', display: 'flex', bgcolor: 'white', p: 4, borderRadius: 4,
        boxShadow: 3, gap: 4
      }}>
        <Grid container spacing={2} sx={{ flex: 1 }}>
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight="bold" color="#1E3A5F" textAlign="center">
              تسجيل الدخول
            </Typography>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Alert severity="error">
                {typeof error === 'string' ? error : 'حدث خطأ أثناء تسجيل الدخول'}
              </Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="البريد الإلكتروني" fullWidth variant="outlined"
                  error={!!errors.email} helperText={errors.email?.message} />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="كلمة المرور"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth variant="outlined"
                  error={!!errors.password} helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Grid>

          {/* ✅ نوع المستخدم */}
          <Grid item xs={12}>
            <Controller
              name="user_type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.user_type}>
                  <FormLabel>نوع المستخدم</FormLabel>
                  <RadioGroup
                    row
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <FormControlLabel value="patient" control={<Radio />} label="مريض" />
                    <FormControlLabel value="doctor" control={<Radio />} label="طبيب" />
                  </RadioGroup>
                  <FormHelperText>{errors.user_type?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth variant="contained" disabled={loading}
              onClick={handleSubmit(onSubmit)}
              sx={{ mt: 3, backgroundColor: '#1E3A5F', color: '#fff', borderRadius: 5, p: 1.5, fontSize: '1rem' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'تسجيل الدخول'}
            </Button>
          </Grid>
        </Grid>

        {/* صورة جانبية */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={currentImage}
            alt="login-illustration"
            style={{
              width: '100%',
              maxWidth: '250px',
              transition: 'opacity 0.5s ease-in-out',
              opacity: fade ? 1 : 0
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
