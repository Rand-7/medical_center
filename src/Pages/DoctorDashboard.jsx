import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const doctorInfo = {
  image: 'https://via.placeholder.com/150',
  name: 'د. محمد الأحمد',
  specialty: 'قلب',
  experience: 15,
  bio: 'طبيب قلب بخبرة 15 سنة في علاج أمراض الشرايين والشرايين التاجية. متميز بالتعامل مع الحالات الحرجة.',
  rating: 4.7,
  patients: 1200,
};

const appointmentTypes = {
  cardiology: ['استشارة أول مرة', 'متابعة دورية', 'تحاليل قلب'],
  gynecology: ['استشارة نسائية', 'فحص دوري', 'حمل وولادة'],
  ophthalmology: ['فحص نظر', 'متابعة عملية', 'كشف مبدئي'],
  ent: ['فحص سمع', 'تنظيف أذن', 'استشارة أذنية'],
};

const getSpecialtyKey = (name) => {
  switch (name) {
    case 'قلب':
      return 'cardiology';
    case 'نسائية':
      return 'gynecology';
    case 'عيون':
      return 'ophthalmology';
    case 'أذن وأنف وحنجرة':
      return 'ent';
    default:
      return 'cardiology';
  }
};

export default function DoctorDashboard() {
  const specialtyKey = getSpecialtyKey(doctorInfo.specialty);
  const typesList = appointmentTypes[specialtyKey] || [];

  const [appointments, setAppointments] = useState([
    { date: '2025-06-08', time: '09:00', type: 'استشارة أول مرة' },
    { date: '2025-06-08', time: '11:00', type: 'متابعة دورية' },
  ]);

  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newType, setNewType] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  // For dialog popup edit
  const [editIndex, setEditIndex] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editType, setEditType] = useState('');

  // Add new appointment
  const handleAdd = () => {
    if (!newDate || !newTime || !newType) return;

    const duplicate = appointments.some(
      (a) => a.date === newDate && a.time === newTime && a.type === newType
    );
    if (duplicate) {
      setAlertOpen(true);
      return;
    }
    setAppointments([...appointments, { date: newDate, time: newTime, type: newType }]);
    setNewDate('');
    setNewTime('');
    setNewType('');
  };

  // Delete appointment
  const handleDelete = (index) => {
    setAppointments(appointments.filter((_, i) => i !== index));
  };

  // Open dialog with data
  const handleEditStart = (index) => {
    const a = appointments[index];
    setEditIndex(index);
    setEditDate(a.date);
    setEditTime(a.time);
    setEditType(a.type);
  };

  // Save edited data
  const handleEditSave = () => {
    if (!editDate || !editTime || !editType) return;

    const duplicate = appointments.some(
      (a, i) =>
        i !== editIndex && a.date === editDate && a.time === editTime && a.type === editType
    );
    if (duplicate) {
      setAlertOpen(true);
      return;
    }
    const updated = [...appointments];
    updated[editIndex] = { date: editDate, time: editTime, type: editType };
    setAppointments(updated);
    setEditIndex(null);
  };

  const handleDialogClose = () => {
    setEditIndex(null);
  };

  const formatDate = (dateStr) => {
    const months = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
    ];
    const [year, month, day] = dateStr.split('-');
    return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
  };

  const formatTime12h = (time24) => {
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'مساءً' : 'صباحاً';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a8d0ff 0%, #2a4d8f 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // تم التغيير هنا عشان نوسط رأسياً
        py: 6,
        px: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: 1100,
          width: '100%',
          display: 'flex',
          gap: 24,
          justifyContent: 'center',
          alignItems: 'center', // تم التغيير هنا عشان نوسط رأسياً داخل المحتوى
        }}
      >
        {/* Left side: Doctor info */}
        <Paper
          elevation={10}
          sx={{
            flex: '0 0 350px',
            p: 3,
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <Avatar
            src={doctorInfo.image}
            alt={doctorInfo.name}
            sx={{
              width: 140,
              height: 140,
              boxShadow: '0 4px 12px rgba(0,123,255,0.3)',
              mb: 2,
            }}
          />
          <Typography variant="h5" fontWeight="700" color="#0d47a1" gutterBottom>
            {doctorInfo.name}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            color="#1976d2"
            mb={1}
            sx={{ letterSpacing: 1 }}
          >
            {doctorInfo.specialty}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2} textAlign="center">
            {doctorInfo.bio}
          </Typography>
          <Divider sx={{ width: '60%', mb: 2 }} />
          <Typography color="#0d47a1" fontWeight="600">
            خبرة: {doctorInfo.experience} سنة
          </Typography>
          <Typography color="#0d47a1" fontWeight="600">
            تقييم: {doctorInfo.rating} ⭐
          </Typography>
          <Typography color="#0d47a1" fontWeight="600">
            عدد المرضى: {doctorInfo.patients}
          </Typography>
        </Paper>

        {/* Right side: Manage appointments */}
        <Paper
          elevation={10}
          sx={{
            flex: 1,
            p: 3,
            borderRadius: 3,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            maxHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h6" fontWeight="700" color="#0d47a1" mb={2}>
            إدارة المواعيد
          </Typography>

          {/* Add new */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              mb: 3,
              alignItems: 'center',
            }}
          >
            <TextField
              label="التاريخ"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 150 }}
            />
            <TextField
              label="الوقت"
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 110 }}
            />
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel id="type-label">نوع الموعد</InputLabel>
              <Select
                labelId="type-label"
                value={newType}
                label="نوع الموعد"
                onChange={(e) => setNewType(e.target.value)}
              >
                {typesList.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{ fontWeight: 600, px: 3 }}
              onClick={handleAdd}
            >
              إضافة
            </Button>
          </Box>

          {/* Appointments list */}
          <Box
            sx={{
              overflowY: 'auto',
              flex: 1,
              borderRadius: 2,
              bgcolor: '#e8f0fe',
              p: 2,
            }}
          >
            <List>
              {appointments.length === 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', mt: 4 }}
                >
                  لا توجد مواعيد مضافة بعد.
                </Typography>
              )}
              {appointments.map(({ date, time, type }, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditStart(index)}
                        sx={{ color: '#1976d2' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(index)}
                        sx={{ color: '#d32f2f' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={`${formatDate(date)} — ${formatTime12h(time)}`}
                    secondary={`نوع الموعد: ${type}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>

        {/* Edit dialog */}
    <Dialog
  open={editIndex !== null}
  onClose={handleDialogClose}
  PaperProps={{
    sx: {
      borderRadius: 3,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)', // ظل أقوى
      p: 3,
      minWidth: 320,
    },
  }}
  BackdropProps={{
    sx: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // خلفية داكنة شفافة
      backdropFilter: 'blur(2px)', // تأثير ضبابي خفيف للخلفية
    },
  }}
>
  <DialogTitle>تعديل الموعد</DialogTitle>
<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
  <TextField
    label="التاريخ"
    type="date"
    value={editDate}
    onChange={(e) => setEditDate(e.target.value)}
    InputLabelProps={{ shrink: true }}
    fullWidth
    sx={{
      '& .MuiInputBase-root': {
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.85)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
      },
      '& .MuiInputBase-root:hover': {
        boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
      },
      '& .Mui-focused': {
        boxShadow: '0 0 8px 2px #1976d2',
        bgcolor: 'rgba(255,255,255,1)',
      },
    }}
  />
  <TextField
    label="الوقت"
    type="time"
    value={editTime}
    onChange={(e) => setEditTime(e.target.value)}
    InputLabelProps={{ shrink: true }}
    fullWidth
    sx={{
      '& .MuiInputBase-root': {
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.85)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
      },
      '& .MuiInputBase-root:hover': {
        boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
      },
      '& .Mui-focused': {
        boxShadow: '0 0 8px 2px #1976d2',
        bgcolor: 'rgba(255,255,255,1)',
      },
    }}
  />
  <FormControl fullWidth sx={{
    borderRadius: 2,
    bgcolor: 'rgba(255,255,255,0.85)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1976d2',
      boxShadow: '0 0 8px 2px #1976d2',
    },
  }}>
    <InputLabel id="edit-type-label">نوع الموعد</InputLabel>
    <Select
      labelId="edit-type-label"
      value={editType}
      label="نوع الموعد"
      onChange={(e) => setEditType(e.target.value)}
      sx={{
        borderRadius: 2,
        bgcolor: 'transparent',
      }}
    >
      {typesList.map((type) => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</DialogContent>

<DialogActions
  sx={{
    justifyContent: 'space-between',
    px: 3,
    pb: 2,
  }}
>
  <Button
    onClick={handleDialogClose}
    sx={{
      color: '#1976d2',
      fontWeight: '600',
      border: '2px solid #1976d2',
      borderRadius: 2,
      px: 3,
      '&:hover': {
        backgroundColor: '#1976d2',
        color: '#fff',
        borderColor: '#1976d2',
      },
      textTransform: 'none',
    }}
  >
    إلغاء
  </Button>
  <Button
    variant="contained"
    onClick={handleEditSave}
    sx={{
      fontWeight: '700',
      px: 3,
      borderRadius: 2,
      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.6)',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#0d47a1',
        boxShadow: '0 6px 18px rgba(13, 71, 161, 0.8)',
      },
    }}
  >
    حفظ
  </Button>
</DialogActions>

</Dialog>


        {/* Alert snackbar */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={4000}
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
            هذا الموعد موجود مسبقاً!
          </Alert>
        </Snackbar>
      </motion.div>
    </Box>
  );
}
