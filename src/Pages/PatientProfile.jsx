import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatient, updatePatient, clearUpdateStatus } from '../slices/patientSlice';

const PatientProfile = () => {
  const dispatch = useDispatch();
  const { data: patient, loading, updateStatus, error } = useSelector((state) => state.patient);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(fetchPatient());
  }, [dispatch]);

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  useEffect(() => {
    if (updateStatus) {
      setSnackbar({ open: true, message: updateStatus, severity: 'success' });
      dispatch(clearUpdateStatus());
      setIsEditing(false);
    } else if (error) {
      setSnackbar({ open: true, message: error, severity: 'error' });
    }
  }, [updateStatus, error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = () => {
    if (formData) {
      dispatch(updatePatient(formData));
    }
  };

  const fieldStyle = {
    '& .MuiInputBase-root': {
      borderRadius: '12px',
      backgroundColor: isEditing ? '#f5faff' : '#f9f9f9',
    },
    '& .MuiInputLabel-root': {
      color: '#1976d2',
      fontWeight: 'bold',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#bbdefb',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#64b5f6',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1976d2',
      borderWidth: '2px',
    },
  };

  if (loading || !formData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, px: 2 }}>
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          p: 3,
          borderRadius: '20px',
          boxShadow: 6,
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ mb: 3, color: '#1976d2', fontWeight: 'bold', textAlign: 'center' }}
          >
            معلوماتي الشخصية
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="الاسم الكامل"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                sx={fieldStyle}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="البريد الإلكتروني"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                sx={fieldStyle}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                sx={fieldStyle}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1.5, borderColor: '#e0e0e0' }} />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="تاريخ الميلاد"
                name="birth_date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.birth_date}
                onChange={handleChange}
                disabled={!isEditing}
                sx={fieldStyle}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="الجنس"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={!isEditing}
                sx={fieldStyle}
              >
                <MenuItem value="ذكر">ذكر</MenuItem>
                <MenuItem value="انثى">أنثى</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="العنوان"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                sx={fieldStyle}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="النوع"
                value="مريض"
                disabled
                sx={fieldStyle}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            {isEditing ? (
              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  background: 'linear-gradient(135deg, #4FC3F7, #1976D2)',
                  color: '#fff',
                  px: 4,
                  py: 1.5,
                  borderRadius: '25px',
                  boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #29B6F6, #1565C0)',
                    boxShadow: '0 6px 16px rgba(33, 150, 243, 0.4)',
                  },
                }}
              >
                حفظ
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={handleEditToggle}
                sx={{
                  color: '#1976d2',
                  borderColor: '#64b5f6',
                  px: 4,
                  py: 1.5,
                  borderRadius: '25px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    borderColor: '#1976d2',
                  },
                }}
              >
                تعديل
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PatientProfile;
