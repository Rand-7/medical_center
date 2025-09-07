
// import React, { useState , useEffect } from "react";
// import {
//   Box,
//   Button,
//   Stepper,
//   Step,
//   StepLabel,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Typography,
//   Paper,
// } from "@mui/material";
// import EventIcon from "@mui/icons-material/Event";
// import ScheduleIcon from "@mui/icons-material/Schedule";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAvailablePatientTime } from "../slices/avaliblalePatientTime";


// const blueColor = "#1976d2";
// const steps = ["اختر نوع الزيارة", "اختر اليوم", "اختر الوقت", "تأكيد"];

// // ✅ أيقونات الخطوات
// function ColorStepIcon(props) {
//   const { active, icon } = props;
//   const icons = {
//     1: <AssignmentIcon />,
//     2: <EventIcon />,
//     3: <ScheduleIcon />,
//     4: <CheckCircleIcon />,
//   };
//   const el = icons[Number(icon)] || icons[1];
//   return (
//     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//       {React.cloneElement(el, { sx: { color: active ? blueColor : "#000" } })}
//     </Box>
//   );
// }

// export default function BookingPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { doctor } = location.state || {}; // جلب بيانات الدكتور

//   const { days, status, error } = useSelector((state) => state.avaliblePatientSlice);

//   const [activeStep, setActiveStep] = useState(0);
//   const [visitType, setVisitType] = useState("");
//   const [day, setDay] = useState("");
//   const [time, setTime] = useState("");

//   useEffect(() => {
//     if (doctor?.id && doctor?.subSpecializationId) {
//       dispatch(
//         fetchAvailablePatientTime({
//           doctorId: doctor.id,
//           subSpecializationId: doctor.subSpecializationId,
//         })
//       );
//     }
//   }, [dispatch, doctor]);

//   const handleNext = () => {
//     if (activeStep === steps.length - 1) {
//       alert(`تم تأكيد الحجز مع ${doctor?.name} يوم ${day} الساعة ${time}`);
//       navigate(-1); // رجوع للصفحة السابقة بعد الحجز
//     } else {
//       setActiveStep((prev) => prev + 1);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   const stepContent = (step) => {
//     if (status === "loading") {
//       return (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (status === "failed") {
//       return (
//         <Typography color="error" sx={{ mt: 3 }}>
//           حدث خطأ أثناء جلب المواعيد: {error}
//         </Typography>
//       );
//     }

//     switch (step) {
//       case 0:
//         return (
//           <FormControl fullWidth sx={{ mt: 3 }}>
//             <InputLabel sx={{ fontSize: "1.1rem" }}>نوع الزيارة</InputLabel>
//             <Select value={visitType} onChange={(e) => setVisitType(e.target.value)}>
//               <MenuItem value="كشف">كشف</MenuItem>
//               <MenuItem value="استشارة">استشارة</MenuItem>
//             </Select>
//           </FormControl>
//         );
//         case 1:
//           return (
//             <FormControl fullWidth sx={{ mt: 3 }}>
//               <InputLabel sx={{ fontSize: "1.1rem" }}>اليوم</InputLabel>
//               <Select value={day} onChange={(e) => setDay(e.target.value)}>
//                 {days.map((d) => (
//                   <MenuItem key={d.date} value={d.date}>
//                     {`${d.weekday} (${d.date})`}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           );
//         case 2:
//           const selectedDay = days.find((d) => d.date === day);
//           const times = selectedDay?.slots || [];
//           return (
//             <FormControl fullWidth sx={{ mt: 3 }}>
//               <InputLabel sx={{ fontSize: "1.1rem" }}>الوقت</InputLabel>
//               <Select value={time} onChange={(e) => setTime(e.target.value)}>
//                 {times.length > 0 ? (
//                   times.map((t, i) => (
//                     <MenuItem key={i} value={t}>
//                       {t}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>لا يوجد مواعيد متاحة لهذا اليوم</MenuItem>
//                 )}
//               </Select>
//             </FormControl>
//           );
//       case 3:
//         return (
//           <Box sx={{ mt: 2, textAlign: "center" }}>
//             <Typography variant="subtitle1" gutterBottom>
//               تأكيد الحجز مع <strong>{doctor?.name}</strong>
//             </Typography>
//             <Typography variant="body1">
//               نوع الزيارة: {visitType} <br /> اليوم: {day} <br /> الساعة: {time}
//             </Typography>
//           </Box>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         py: 5,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "flex-start",
//         backgroundColor: "#f9f9f9",
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           p: 4,
//           borderRadius: 4,
//           width: "100%",
//           maxWidth: 600,
//           backgroundColor: "#fff",
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
//           حجز موعد مع {doctor?.name}
//         </Typography>
        // <Typography variant="body2" color="textSecondary" textAlign="center" mb={5}>
        //   اختر تفاصيل الموعد لإتمام الحجز
        // </Typography>

//         <Stepper
//           activeStep={activeStep}
//           alternativeLabel
//           sx={{ mt: 1, mb: 3, "& .MuiStepLabel-label": { fontSize: "1.3rem" } }}
//         >
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel StepIconComponent={ColorStepIcon}>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeStep}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             {stepContent(activeStep)}
//           </motion.div>
//         </AnimatePresence>

//         <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
//           <Button
//             variant="contained"
//             fullWidth
//             onClick={handleNext}
//             disabled={
//               (activeStep === 0 && !visitType) ||
//               (activeStep === 1 && !day) ||
//               (activeStep === 2 && !time)
//             }
//             sx={{ borderRadius: 3, textTransform: "none", fontWeight: "bold" }}
//           >
//             {activeStep === steps.length - 1 ? "تأكيد" : "التالي"}
//           </Button>
//           {activeStep > 0 && (
//             <Button
//               fullWidth
//               onClick={handleBack}
//               sx={{ textTransform: "none", borderRadius: 3 }}
//             >
//               رجوع
//             </Button>
//           )}
//         </Box>

//         <Button
//           fullWidth
//           variant="text"
//           onClick={() => navigate(-1)}
//           sx={{ mt: 2, textTransform: "none", color: "#888" }}
//         >
//           إلغاء
//         </Button>
//       </Paper>
//     </Box>
//   );
// }


// src/pages/BookingPage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubSpecializations } from "../slices/subSpecializationSlice";
import { fetchAvailablePatientTime } from "../slices/avaliblalePatientTime";
import { useLocation, useNavigate } from "react-router-dom";
import { bookAppointment } from "../slices/takeDateSlice";

const steps = ["اختيار نوع الزيارة", "اختيار اليوم", "اختيار الوقت", "تأكيد"];

export default function BookingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor } = location.state || {};

  const [activeStep, setActiveStep] = useState(0);
  const [visitType, setVisitType] = useState(""); // subSpecializationId
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // قراءة التخصصات الفرعية (أنواع الزيارة)
  const {
    list: subSpecializations = [],
    loading: subSpecsLoading,
    error: subSpecsError,
  } = useSelector((state) => state.subSpecializations || {});

  

  // قراءة الأوقات المتاحة
  const {
    days = [],
    status: slotsStatus,
    error: slotsError,
  } = useSelector((state) => state.avaliblePatientSlice || {});

  //قراءة حالة الحجز
  const { status: bookingStatus, error: bookingError, booking } = useSelector(
    (state) => state.takedate
  );

  const { user } = useSelector((state) => state.auth);

  const slotsLoading = slotsStatus === "loading";

  // عند دخول الصفحة → جلب التخصصات الفرعية حسب specializationId
  useEffect(() => {
    if (doctor?.specialization_id?.id) {
      dispatch(fetchSubSpecializations(doctor.specialization_id.id));
    }
  }, [dispatch, doctor]);

  // عند اختيار نوع الزيارة → جلب الأوقات المتاحة
  useEffect(() => {
    if (doctor?.id && visitType) {
      dispatch(
        fetchAvailablePatientTime({
          doctorId: doctor.id,
          subSpecializationId: visitType,
        })
      );
    }
  }, [dispatch, doctor, visitType]);

  useEffect(() => {
    if (bookingStatus === "succeeded") {
      alert("تم الحجز بنجاح!");
      navigate(-1); // ترجع للصفحة السابقة
    }
    if (bookingStatus === "failed") {
      alert(`فشل الحجز: ${bookingError}`);
    }
  }, [bookingStatus, bookingError, navigate]);
  
// const handleConfirm = () => {
//     const [year, month, day] = selectedDate.split("-"); // "2025-09-10" → [2025, 09, 10]
//     const formattedDate = `${day}-${month}-${year}`;
//     dispatch(
//       bookAppointment({
//         doctor_id: doctor.id,
//         patient_id: user.id,
//         sub_specialization_id:visitType ,
//         appointment_date: `${formattedDate} ${selectedTime}`,
//       })
//     );
//   };
const handleConfirm = () => {
  if (!selectedDate || !selectedTime) {
    alert("الرجاء اختيار اليوم والوقت");
    return;
  }

  // تركيب التاريخ والوقت
  const appointmentDateTime = `${selectedDate} ${selectedTime}`; 
  // مثال: "2025-09-05 09:00"

  dispatch(
    bookAppointment({
      doctor_id: doctor.id,
      patient_id: user.id,
      sub_specialization_id: visitType,
      appointment_date: appointmentDateTime,
    })
  );
};


  

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // const handleConfirm = () => {
  //   alert(
  //     `تم تأكيد الحجز مع الدكتور ${doctor?.name}\n` +
  //       `نوع الزيارة: ${
  //         subSpecializations.find((s) => s.id === visitType)?.name || ""
  //       }\n` +
  //       `اليوم: ${selectedDate}\n` +
  //       `الوقت: ${selectedTime}`
  //   );
  //   navigate(-1); // رجوع للصفحة السابقة
  // };

  // محتوى كل خطوة
  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // اختيار نوع الزيارة
        if (subSpecsLoading)
          return <Typography sx={{ mt: 3 }}>جاري تحميل أنواع الزيارة...</Typography>;
        if (subSpecsError)
          return (
            <Typography sx={{ mt: 3 }} color="error">
              {subSpecsError}
            </Typography>
          );
        return (
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel>نوع الزيارة</InputLabel>
            <Select
              value={visitType}
              onChange={(e) => setVisitType(e.target.value)}
            >
              {subSpecializations.map((spec) => (
                <MenuItem key={spec.id} value={spec.id}>
                  {spec.name} ({spec.duration} دقيقة)
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 1: // اختيار اليوم
        if (slotsLoading)
          return <Typography sx={{ mt: 3 }}>جاري تحميل الأيام المتاحة...</Typography>;
        if (slotsError)
          return (
            <Typography sx={{ mt: 3 }} color="error">
              {slotsError}
            </Typography>
          );
        if (days.length === 0)
          return <Typography sx={{ mt: 3 }}>لا توجد أيام متاحة حالياً</Typography>;
        return (
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel>اليوم</InputLabel>
            <Select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {days.map((day) => (
                <MenuItem key={day.date} value={day.date}>
                  {day.weekday} - {day.date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

        case 2: {
          const selectedDayObj = days.find((d) => d.date === selectedDate);
          const slots = selectedDayObj?.slots || [];
        
          if (!selectedDate) {
            return <Typography sx={{ mt: 3 }}>الرجاء اختيار يوم أولاً</Typography>;
          }
          if (slots.length === 0) {
            return <Typography sx={{ mt: 3 }}>لا توجد أوقات متاحة لهذا اليوم</Typography>;
          }
        
          return (
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel>الوقت</InputLabel>
              <Select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                {slots.map((slot, idx) => {
                  // يدعم الحالتين: لو الـ API رجّع نصوص أو أوبجكتات
                  
                  
                   <MenuItem key={idx} value={slot.time} disabled={slot.is_available === false}>
  {slot.formatted_time ?? slot.time}
</MenuItem>

                    
                  
        
                  const display = slot.formatted_time ?? slot.time; // للنص الظاهر
                  const value = slot.time;                           // نخزن HH:mm
                  const disabled = slot.is_available === false;
        
                  return (
                    <MenuItem key={idx} value={value} disabled={disabled}>
                      {display}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          );
        }

      case 3: // تأكيد
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              تأكيد الموعد
            </Typography>
            <Typography variant="body1">
              دكتور: {doctor?.name} <br />
              نوع الزيارة:{" "}
              {subSpecializations.find((s) => s.id === visitType)?.name || ""} <br />
              اليوم: {selectedDate} <br />
              الساعة: {selectedTime}
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 5,
        display: "flex",
        justifyContent: "center",
        // backgroundColor: "#f9f9f9",
       background: "linear-gradient(135deg,#CFE8FF 0%, #B8D8FF 35%, #A6C8FF 100%)"
      }}
    >
      <Paper sx={{ p: 4, borderRadius: 3, width: "100%", maxWidth: 600 ,maxheight:400}}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          حجز موعد مع {doctor?.name}
        </Typography>
        <Typography variant="h6" color="textSecondary" textAlign="center" mb={5}>
          اختر  تفاصيل  الموعد  لإتمام  الحجز
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent()}

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          {activeStep > 0 && (
            <Button fullWidth onClick={handleBack}>
              رجوع
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button
              fullWidth
              variant="contained"
              onClick={handleNext}
              disabled={
                (activeStep === 0 && !visitType) ||
                (activeStep === 1 && !selectedDate) ||
                (activeStep === 2 && !selectedTime)
              }
            >
              التالي
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              disabled={!selectedTime}
            >
              تأكيد
            </Button>
          )}
        </Box>

        <Button
          fullWidth
          sx={{ mt: 2 }}
          variant="text"
          onClick={() => navigate(-1)}
        >
          إلغاء
        </Button>
      </Paper>
    </Box>
  );
}

