// import {
//   Box, Typography, Card, CardContent, Avatar, Grid, Button,
//   Dialog, DialogActions, DialogContent, DialogTitle,
//   FormControl, InputLabel, Select, MenuItem, Rating
// } from '@mui/material';
// import { useState } from 'react';
// import { doctorsData } from '../data';
// import { useNavigate } from "react-router-dom";
// import { fetchDoctor } from '../slices/doctorSlice';
// import { fetchTopRatedDoctors } from '../slices/topRatedDoctorsSlice';


// const topDoctors = Object.values(doctorsData)
//   .flat()
//   .slice(0, 3); // أهم 3 أطباء مثلاً

// const TopDoctorsSection = () => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [selectedTime, setSelectedTime] = useState('');
  

//   const handleOpenDialog = (doctor) => {
//     setSelectedDoctor(doctor);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedTime('');
//   };

//   const handleConfirmBooking = () => {
//     if (!selectedTime) return;
//     const newAppointment = {
//       doctorId: selectedDoctor.id,
//       doctorName: selectedDoctor.name,
//       specialty: selectedDoctor.specialty,
//       time: selectedTime,
//       date: new Date().toLocaleDateString('ar-EG'),
//       image: selectedDoctor.image,
//     };
//     const existing = JSON.parse(localStorage.getItem('appointments')) || [];
//     localStorage.setItem('appointments', JSON.stringify([...existing, newAppointment]));
//     setOpenDialog(false);
//     setSelectedTime('');
//   };

//   return (
//     <Box sx={{ py: 5, backgroundColor: '#f5f8fc' }}>
//       <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4} color="#1E3A5F">
//         أبرز الأطباء
//       </Typography>

//       <Grid container spacing={3} justifyContent="center">
//         {topDoctors.map((doctor) => (
//           <Grid item xs={12} sm={6} md={4} key={doctor.id}>
//             <Card
//               sx={{
//                 background: 'linear-gradient(135deg, #ffffff, #e8f0fe)',
//                 boxShadow: '0 8px 16px rgba(25, 118, 210, 0.15)',
//                 borderRadius: 3,
//                 p: 2,
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-8px)',
//                   boxShadow: '0 16px 32px rgba(25, 118, 210, 0.3)',
//                 },
//               }}
//             >
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={12} sm={4}>
//                   <Avatar
//                     src={doctor.image}
//                     sx={{
//                       width: 90,
//                       height: 90,
//                       border: '3px solid #e0e0e0',
//                       boxShadow: '0 4px 12px rgba(25, 118, 210, 0.1)',
//                       mx: 'auto',
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={8}>
//                   <CardContent sx={{ p: 0 }}>
//                     <Typography variant="h6" fontWeight="bold" color="#1976d2" gutterBottom>
//                       {doctor.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" mb={1}>
//                       الاختصاص: <strong>{doctor.specialty}</strong>
//                     </Typography>
//                     <Typography variant="body2" mb={1}>
//                       الخبرة: {doctor.experience} سنوات
//                     </Typography>
//                     <Rating value={doctor.rating} readOnly precision={0.1} sx={{ color: '#1976d2' }} />
//                     <Button
//                       onClick={() => navigate('/booking')}
//                       sx={{
//                         mt: 2,
//                         backgroundColor: '#1976d2',
//                         color: '#fff',
//                         '&:hover': { backgroundColor: '#1565c0' },
//                         borderRadius: 5,
//                         fontWeight: 'bold',
//                         width: '100%',
//                       }}
//                     >
//                       حجز الموعد
//                     </Button>
//                   </CardContent>
//                 </Grid>
//               </Grid>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         maxWidth="xs"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             p: 2,
//             background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
//             boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
//           },
//         }}
//       >
//         <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', color: '#0d47a1' }}>
//           حجز موعد مع {selectedDoctor?.name}
//         </DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth>
//             <InputLabel id="time-select-label">اختر الوقت</InputLabel>
//             <Select
//               labelId="time-select-label"
//               value={selectedTime}
//               onChange={(e) => setSelectedTime(e.target.value)}
//               label="اختر الوقت"
//               sx={{ backgroundColor: 'white', borderRadius: 2, mt: 1 }}
//             >
//               {selectedDoctor?.availableTimes?.map((time, i) => (
//                 <MenuItem key={i} value={time}>
//                   {time}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
//           <Button onClick={handleCloseDialog} color="error" variant="outlined" sx={{ borderRadius: 3 }}>
//             إلغاء
//           </Button>
//           <Button
//             onClick={handleConfirmBooking}
//             variant="contained"
//             disabled={!selectedTime}
//             sx={{
//               backgroundColor: '#1976d2',
//               color: '#fff',
//               borderRadius: 3,
//               '&:hover': { backgroundColor: '#1565c0' },
//             }}
//           >
//             تأكيد
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default TopDoctorsSection;

import {
  Box, Typography, Card, CardContent, Avatar, Grid, Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, InputLabel, Select, MenuItem, Rating
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopRatedDoctors } from '../slices/topRatedDoctorsSlice';

const TopDoctorsSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // نجيب البيانات من Redux
  const { doctors, status, error } = useSelector((state) => state.topRatedDoctors);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTopRatedDoctors());
    }
  }, [status, dispatch]);

  const handleOpenDialog = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTime('');
  };

  const handleConfirmBooking = () => {
    if (!selectedTime) return;
    const newAppointment = {
      doctorId: selectedDoctor.doctor_id,         // تعديل: حسب الـ API
      doctorName: selectedDoctor.doctor_name,     // تعديل: حسب الـ API
      specialty: selectedDoctor.specialization_name,
      time: selectedTime,
      date: new Date().toLocaleDateString('ar-EG'),
      image: selectedDoctor.image || '',          // اذا عندك صور بالـ API
    };
    const existing = JSON.parse(localStorage.getItem('appointments')) || [];
    localStorage.setItem('appointments', JSON.stringify([...existing, newAppointment]));
    setOpenDialog(false);
    setSelectedTime('');
  };

  return (
    <Box sx={{ py: 5, backgroundColor: '#f5f8fc' }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4} color="#1E3A5F">
        أبرز الأطباء
      </Typography>

      {status === 'loading' && <Typography textAlign="center">جاري التحميل...</Typography>}
      {status === 'failed' && <Typography textAlign="center" color="error">حدث خطأ: {error}</Typography>}

      <Grid container spacing={3} justifyContent="center">
        {status === 'succeeded' &&
          doctors.slice(0, 3).map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.doctor_id}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, #ffffff, #e8f0fe)',
                  boxShadow: '0 8px 16px rgba(25, 118, 210, 0.15)',
                  borderRadius: 3,
                  p: 2,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 32px rgba(25, 118, 210, 0.3)',
                  },
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Avatar
                      src={doctor.image || '/default-doctor.png'}
                      sx={{
                        width: 90,
                        height: 90,
                        border: '3px solid #e0e0e0',
                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.1)',
                        mx: 'auto',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <CardContent sx={{ p: 0 }}>
                      <Typography variant="h6" fontWeight="bold" color="#1976d2" gutterBottom>
                        {doctor.doctor_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        الاختصاص: <strong>{doctor.specialization_name}</strong>
                      </Typography>
                      <Rating
                        value={doctor.average_rating}
                        readOnly
                        precision={0.1}
                        sx={{ color: '#1976d2' }}
                      />
                      {/* <Button
                        onClick={() => navigate('/booking')}
                        sx={{
                          mt: 2,
                          backgroundColor: '#1976d2',
                          color: '#fff',
                          '&:hover': { backgroundColor: '#1565c0' },
                          borderRadius: 5,
                          fontWeight: 'bold',
                          width: '100%',
                        }}
                      >
                        حجز الموعد
                      </Button> */}
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
      </Grid>

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
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', color: '#0d47a1' }}>
          حجز موعد مع {selectedDoctor?.doctor_name}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="time-select-label">اختر الوقت</InputLabel>
            <Select
              labelId="time-select-label"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              label="اختر الوقت"
              sx={{ backgroundColor: 'white', borderRadius: 2, mt: 1 }}
            >
              {selectedDoctor?.availableTimes?.map((time, i) => (
                <MenuItem key={i} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="error" variant="outlined" sx={{ borderRadius: 3 }}>
            إلغاء
          </Button>
          <Button
            onClick={handleConfirmBooking}
            variant="contained"
            disabled={!selectedTime}
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              borderRadius: 3,
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TopDoctorsSection;
