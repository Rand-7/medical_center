import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField, Button, Grid, Box, Typography, IconButton, InputAdornment, Alert,
  Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, FormHelperText, CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetRegisterState } from '../slices/registerSlice';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().matches(/^[A-Za-z\s]+$/, 'يجب أن يحتوي الاسم على أحرف فقط').required('الاسم مطلوب'),
  phone: yup.string().matches(/^0[0-9]{9}$/, 'رقم الهاتف يجب أن يبدأ بـ 0 ويحتوي على 10 أرقام').required('رقم الهاتف مطلوب'),
  birth_date: yup.date().required('تاريخ الميلاد مطلوب').typeError('تاريخ الميلاد غير صحيح'),
  email: yup.string().email('البريد الإلكتروني غير صحيح').required('البريد الإلكتروني مطلوب'),
  password: yup.string().min(6, 'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل').max(10, 'يجب ألا تتجاوز كلمة المرور 10 أحرف').required('كلمة المرور مطلوبة'),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'كلمة المرور غير متطابقة').required('تأكيد كلمة المرور مطلوب'),
  address: yup.string().required('العنوان مطلوب'),
  gender: yup.string().oneOf(['ذكر', 'انثى'], 'الرجاء اختيار الجنس').required('الجنس مطلوب')
}).required();

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      birth_date: '',
      email: '',
      password: '',
      password_confirmation: '',
      address: '',
      gender: ''
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { loading, error, success } = useSelector((state) => state.register);

  useEffect(() => {
    if (success) {
      setSuccessMessage('تم التسجيل بنجاح! سيتم توجيهك إلى صفحة تسجيل الدخول...');
      setTimeout(() => {
        dispatch(resetRegisterState());
        navigate('/login');
      }, 2500);
    } else if (error) {
      setErrorMessage(error);
    }
  }, [success, error, dispatch, navigate]);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

const onSubmit = (data) => {
  setErrorMessage('');
  setSuccessMessage('');
  
  // نختصر التاريخ إلى 'YYYY-MM-DD' فقط (بدون الوقت)
  const formattedBirthDate = new Date(data.birth_date).toISOString().split('T')[0];

  const payload = {
    ...data,
    birth_date: formattedBirthDate,
    // باقي الحقول كما هي
  };

  dispatch(registerUser(payload));
};


  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #77B6E0, #1E3A5F)', p: 2 }}>
      <Box sx={{ width: 500, bgcolor: 'white', p: 4, borderRadius: 4, boxShadow: 3, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold" color="#1E3A5F" marginBottom={3}>
          Sign Up
        </Typography>

        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Full Name" fullWidth variant="outlined" error={!!errors.name} helperText={errors.name?.message} />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Phone Number" fullWidth variant="outlined" placeholder="0XXXXXXXXX" error={!!errors.phone} helperText={errors.phone?.message} />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="birth_date"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Birthdate" type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} error={!!errors.birth_date} helperText={errors.birth_date?.message} />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Email" placeholder="example@email.com" fullWidth variant="outlined" error={!!errors.email} helperText={errors.email?.message} />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="password_confirmation"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    fullWidth
                    variant="outlined"
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Address" fullWidth variant="outlined" error={!!errors.address} helperText={errors.address?.message} />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.gender}>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup row {...field}>
                      <FormControlLabel value="ذكر" control={<Radio />} label="ذكر" />
                      <FormControlLabel value="انثى" control={<Radio />} label="أنثى" />
                    </RadioGroup>
                    <FormHelperText>{errors.gender?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, backgroundColor: '#1E3A5F', color: '#fff', borderRadius: 5, p: 1.5, fontSize: '1rem' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterForm;
