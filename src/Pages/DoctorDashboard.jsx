import React, { useEffect } from 'react';
import {
  Card, CardContent, Typography, Avatar, Grid, CircularProgress, Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctor } from '../slices/doctorSlice';

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const { data: doctor, loading, error } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(fetchDoctor());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">حدث خطأ: {error}</Typography>;

  return (
    <Box
      sx={{
        p: 4,
        background: 'linear-gradient(to right, #e0f7fa, #f3e5f5)',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ maxWidth: 800, margin: 'auto', borderRadius: 4, boxShadow: 4, backdropFilter: 'blur(4px)' }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Avatar
                src={doctor?.image}
                alt={doctor?.name}
                sx={{ width: 150, height: 150, mx: 'auto', border: '4px solid #90caf9' }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h5" gutterBottom>{doctor?.name}</Typography>
              <Typography variant="subtitle1">📧 {doctor?.email}</Typography>
              <Typography variant="subtitle1">🩺 التخصص: {doctor?.specialization_id}</Typography>
              <Typography variant="subtitle1">⏳ الخبرة: {doctor?.practice}</Typography>
            </Grid>
          </Grid>
          <Box mt={4}>
            <Typography variant="h6">عن الطبيب:</Typography>
            <Typography>{doctor?.about_doctor || "لا يوجد وصف حالياً."}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DoctorDashboard;
