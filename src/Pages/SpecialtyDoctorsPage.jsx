// src/Pages/SpecialtyDoctors.jsx
import React, { useEffect } from 'react';
import {
  Box, Typography, Card, Avatar, Grid, Button
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorsBySpecialization } from '../slices/doctorsSlice';

const SpecialtyDoctors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { specializationId, specialtyName } = location.state || {};
  const dispatch = useDispatch();

  // 🔹 جلب الأطباء
  const { items: doctors = [], loading, error } = useSelector(state => state.doctors);

  // أول ما يفتح الصفحة يجيب الأطباء
  useEffect(() => {
    if (specializationId) {
      dispatch(fetchDoctorsBySpecialization(specializationId));
    }
  }, [dispatch, specializationId]);

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
                  onClick={() =>
                    navigate("/booking", {
                      state: { doctor: doc }  // 🔹 تمرير بيانات الدكتور لصفحة BookingPage
                    })
                  }
                >
                  حجز موعد
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SpecialtyDoctors;
