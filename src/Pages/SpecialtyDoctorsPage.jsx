import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, Avatar, Grid, Rating,
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { arSA } from 'date-fns/locale';

import { doctorsData, specialties } from '../data';

const SpecialtyDoctors = () => {
  // مثال: تختار تخصص الكاردولوجي، غير حسب حاجتك
  const specialtyId = 'cardiology';
  const doctors = doctorsData[specialtyId] || [];
  const specialtyName = specialties.find((s) => s.id === specialtyId)?.name || '';

  const [hoveredDoctorId, setHoveredDoctorId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  // تقييمات المستخدم محفوظة { doctorId: ratingValue }
  const [userRatings, setUserRatings] = useState({});

  // تحميل التقييمات من localStorage عند بداية المكون
  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('userRatings')) || {};
    setUserRatings(savedRatings);
  }, []);

  // حفظ التقييم في localStorage
  const handleUserRatingChange = (doctorId, newValue) => {
    const newRatings = { ...userRatings, [doctorId]: newValue };
    setUserRatings(newRatings);
    localStorage.setItem('userRatings', JSON.stringify(newRatings));
  };

  const handleOpenDialog = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setSelectedTime('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDate(null);
    setSelectedTime('');
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('يرجى اختيار التاريخ والوقت');
      return;
    }

    const formattedDate = selectedDate.toLocaleDateString('ar-EG');

    const newAppointment = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: formattedDate,
      time: selectedTime,
      image: selectedDoctor.image,
    };

    const existing = JSON.parse(localStorage.getItem('appointments')) || [];
    localStorage.setItem('appointments', JSON.stringify([...existing, newAppointment]));

    setOpenDialog(false);
    alert(`تم حجز موعد مع الدكتور ${selectedDoctor.name} بتاريخ ${formattedDate} الساعة ${selectedTime}`);
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 5 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
        الأطباء - {specialtyName}
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {doctors.map((doctor) => (
          <Grid
            item xs={12} sm={6} md={4}
            key={doctor.id}
            onMouseEnter={() => setHoveredDoctorId(doctor.id)}
            onMouseLeave={() => setHoveredDoctorId(null)}
          >
            <Card
              sx={{
                background: 'linear-gradient(135deg, #ffffff, #e8f0fe)',
                boxShadow: '0 8px 16px rgba(25, 118, 210, 0.15)',
                borderRadius: 3,
                p: 2,
                maxWidth: 320,
                mx: 'auto',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 32px rgba(25, 118, 210, 0.3)',
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 250,
              }}
            >
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  src={doctor.image}
                  sx={{
                    width: 90,
                    height: 90,
                    border: '3px solid #e0e0e0',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.1)',
                    transition: 'transform 0.3s ease',
                    mr: 2,
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#1976d2" gutterBottom>
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={0.5}>
                    الاختصاص: <strong>{doctor.specialty}</strong>
                  </Typography>
                  <Typography variant="body2" mb={0.5}>
                    الخبرة: {doctor.experience} سنوات
                  </Typography>

                  {/* تقييم تفاعلي */}
                  <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                    <Rating
                      name={`user-rating-${doctor.id}`}
                      value={userRatings[doctor.id] || 0}
                      precision={1}
                      onChange={(event, newValue) => handleUserRatingChange(doctor.id, newValue)}
                      sx={{ color: '#1976d2' }}
                    />
                    <Typography variant="body2" color="#1976d2" fontWeight="bold">
                      {userRatings[doctor.id] ? `(${userRatings[doctor.id]} / 5)` : 'قم بالتقييم'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Button
                onClick={() => handleOpenDialog(doctor)}
                sx={{
                  mt: 0,
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#1565c0' },
                  borderRadius: 5,
                  fontWeight: 'bold',
                  width: '100%',
                }}
              >
                حجز الموعد
              </Button>

              {hoveredDoctorId === doctor.id && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: '#e3f2fd',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                    color: '#0d47a1',
                    fontSize: '0.9rem',
                    lineHeight: 1.4,
                  }}
                >
                  <Typography fontWeight="bold" mb={0.5}>تقييم الطبيب (تقييم الموقع):</Typography>
                  <Rating value={doctor.rating} readOnly precision={0.1} size="small" sx={{ color: '#1976d2' }} />
                  <Typography mt={1}>مواعيد متاحة:</Typography>
                  {doctor.availableTimes && doctor.availableTimes.length > 0 ? (
                    doctor.availableTimes.map((time, i) => (
                      <Typography key={i} sx={{ ml: 1 }}>
                        - {time}
                      </Typography>
                    ))
                  ) : (
                    <Typography sx={{ fontStyle: 'italic' }}>
                      لا توجد مواعيد متاحة
                    </Typography>
                  )}
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog حجز الموعد */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#0d47a1',
            fontSize: '1.6rem',
            mb: 1,
            letterSpacing: 1,
            textShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          حجز موعد مع {selectedDoctor?.name}
        </DialogTitle>

        <DialogContent dividers sx={{ pt: 0 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={arSA}>
            <DatePicker
              label="اختر التاريخ"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel shrink htmlFor="date-picker">{params.inputProps.placeholder}</InputLabel>
                  <input {...params.inputProps} style={{ width: '100%', padding: 10, fontSize: 16, borderRadius: 6, border: '1px solid #ccc' }} />
                </FormControl>
              )}
              minDate={new Date()}
            />
          </LocalizationProvider>

          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="time-select-label">اختر الوقت</InputLabel>
            <Select
              labelId="time-select-label"
              id="time-select"
              value={selectedTime}
              label="اختر الوقت"
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              {selectedDoctor?.availableTimes && selectedDoctor.availableTimes.length > 0 ? (
                selectedDoctor.availableTimes.map((time, i) => (
                  <MenuItem key={i} value={time}>{time}</MenuItem>
                ))
              ) : (
                <MenuItem disabled>لا توجد مواعيد متاحة</MenuItem>
              )}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            variant="contained"
            onClick={handleConfirmBooking}
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
              fontWeight: 'bold',
              width: '50%',
              borderRadius: 3,
              py: 1.2,
              fontSize: '1rem',
            }}
          >
            تأكيد الحجز
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SpecialtyDoctors;
