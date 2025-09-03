// src/Pages/SpecialtyDoctors.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, Avatar, Grid, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Alert, CircularProgress, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorsBySpecialization } from '../slices/doctorsSlice';
import { bookAppointment, resetAppointment } from '../slices/takeDateSlice';
import { fetchSubSpecializations, clearSubSpecializations } from '../slices/subSpecializationSlice';

const SpecialtyDoctors = () => {
  const location = useLocation();
  const { specializationId, specialtyName } = location.state || {};
  const dispatch = useDispatch();

  // 🔹 جلب الأطباء
  const { items: doctors = [], loading, error } = useSelector(state => state.doctors);

  // 🔹 جلب التخصصات الفرعية
  const { list: subSpecializations, loading: subLoading, error: subError } = useSelector(
    state => state.subSpecializations
  );

  // 🔹 state الخاصة بالفورم
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [subSpecialization, setSubSpecialization] = useState("");
  const [notes, setNotes] = useState("");

  // 🔹 state من الـ slice الحجز
  const { loading: bookingLoading, success, error: bookingError } = useSelector(
    state => state.takedate
  );

  // أول ما يفتح الصفحة يجيب الأطباء
  useEffect(() => {
    if (specializationId) {
      dispatch(fetchDoctorsBySpecialization(specializationId));
    }
  }, [dispatch, specializationId]);

  // فتح الدايالوج مع دكتور محدد + جلب التخصصات الفرعية
  const handleOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
    if (specializationId) {
      dispatch(fetchSubSpecializations(specializationId));
    }
  };

  // إغلاق الدايالوج
  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor(null);
    setAppointmentDate("");
    setSubSpecialization("");
    setNotes("");
    dispatch(resetAppointment());
    dispatch(clearSubSpecializations());
  };

  // إرسال الحجز
  const handleBook = () => {
    if (!appointmentDate || !subSpecialization) return;
    dispatch(
      bookAppointment({
        patient_id: 1, // 🔹 لازم تجيبها من authSlice
        doctor_id: selectedDoctor.id,
        sub_specialization_id: subSpecialization,
        appointment_date: appointmentDate,
        token: localStorage.getItem("token"),
      })
    );
  };

  if (loading) return <Typography align="center" mt={4}>جاري تحميل الأطباء...</Typography>;
  if (error) return <Typography align="center" mt={4} color="error">{error}</Typography>;

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 5 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
        الأطباء - {specialtyName}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {doctors.map((doc) => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <Card
              sx={{
                p: 2,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #bbdefb 0%, #ffffff 100%)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                },
                display: 'flex',
                alignItems: 'center',
                maxWidth: 350,
                mx: 'auto',
              }}
            >
              <Avatar
                src={doc.image}
                sx={{
                  width: 80,
                  height: 80,
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)',
                  mr: 2,
                  flexShrink: 0,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold" color="#1976d2" gutterBottom>
                  {doc.name}
                </Typography>
                <Typography variant="body2" color="#0d47a1" mb={1}>
                  {doc.specialization_type}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#1565c0' },
                    borderRadius: 3,
                    fontWeight: 'bold',
                    px: 3,
                    py: 1,
                    fontSize: '0.85rem',
                  }}
                  onClick={() => handleOpen(doc)}
                >
                  حجز موعد
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog حجز الموعد */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>حجز موعد مع {selectedDoctor?.name}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="type-label">نوع الحجز</InputLabel>
            <Select
              labelId="type-label"
              value={subSpecialization}
              onChange={(e) => setSubSpecialization(e.target.value)}
            >
              {subLoading && <MenuItem disabled>جاري التحميل...</MenuItem>}
              {subError && <MenuItem disabled>فشل التحميل</MenuItem>}
              {subSpecializations.map((sub) => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="تاريخ ووقت الموعد"
            type="datetime-local"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />

          {bookingError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {bookingError.error || bookingError.message || "فشل الحجز"}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              ✅ تم الحجز بنجاح
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={handleBook}
            disabled={bookingLoading}
          >
            {bookingLoading ? <CircularProgress size={20} /> : "تأكيد الحجز"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SpecialtyDoctors;
