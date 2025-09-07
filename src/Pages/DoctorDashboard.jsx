
import React, { useEffect, useState } from "react";
import {
  Avatar, Box, Button, Card, CardContent, Chip, Divider, List, ListItem,
  ListItemText, Stack, Tab, Tabs, Typography, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, MenuItem, IconButton, CircularProgress,
  FormControl, InputLabel, Select,Snackbar, Alert
} from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctor, clearDoctor } from "../slices/doctorSlice";
import { addDoctorSchedule } from "../slices/scheduleSlice";
import { fetchSubSpecializations, clearSubSpecializations } from "../slices/subSpecializationSlice";
import { logoutUser } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { fetchDoctorSchedules } from "../slices/avalibaleDoctorTime";
import { updateSchedule } from "../slices/updateScheduleSlice";
import { fetchAppointmentsByStatus } from "../slices/appointmentsByStatusSlice";
import { updateAppointmentAttendance } from "../slices/appointmentAttendanceSlice"; // ✅ جديد
import { addReport } from "../slices/reportsSlice"; // ✅ إضافة تقارير
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const statuses = [
  { key: "pending", label: "pending" },
  { key: "completed", label: "completed" },
  { key: "no_show", label: "no_show" },
];

export default function DoctorDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctor, loading, error } = useSelector((state) => state.doctor);
  const { schedules, loading: schedulesLoading, error: schedulesError } = useSelector(
    (state) => state.avalibleSlice
  );
  const { appointments, loading: appointmentsLoading } = useSelector(
    (state) => state.appointmentsByStatus
  );
  const { list: subSpecializations, loading: subSpecsLoading, error: subSpecsError } = useSelector((state) => state.subSpecializations);
  const { user } = useSelector(state => state.auth);
  // ✅ التقارير
  const { loading: reportLoading, success: reportSuccess, error: reportError } = useSelector(state => state.reportsSlice);
  const [tab, setTab] = useState(1);
  const [statusTab, setStatusTab] = useState("pending");
  const [formError, setFormError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);

    // 🟢 Dialog لإضافة تقرير
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reportContent, setReportContent] = useState("");
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");

  const [formData, setFormData] = useState({
    day: "",
    start_time: "",
    end_time: "",
    is_available: 1,
    sub_specialization_id: "",
  });

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchDoctor(user.id));
      dispatch(fetchDoctorSchedules(user.id));
      dispatch(fetchAppointmentsByStatus({ doctorId: user.id, status: statusTab, token: user?.token }));
    }
    return () => {
      dispatch(clearDoctor());
    };
  }, [user, dispatch]);

  useEffect(() => {
    const specId = doctor?.specialization_id?.id ?? doctor?.specialization_id;
    if (specId) {
      dispatch(clearSubSpecializations());
      dispatch(fetchSubSpecializations(specId));
    }
  }, [doctor?.specialization_id, dispatch]);

  useEffect(() => {
    if (user?.id && statusTab) {
      dispatch(fetchAppointmentsByStatus({ doctorId: user.id, status: statusTab, token: user?.token }));
    }
  }, [statusTab, user, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.day || !formData.start_time || !formData.end_time || !formData.sub_specialization_id) {
      setFormError("⚠️ الرجاء ملء جميع الحقول.");
      return false;
    }
    if (formData.start_time >= formData.end_time) {
      setFormError("⚠️ وقت النهاية يجب أن يكون بعد وقت البداية.");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    const formatTime = (time) => time?.slice(0, 5);

    if (editing) {
      dispatch(
        updateSchedule({
          scheduleId: editing.id,
          data: {
            start_time: formatTime(formData.start_time),
            end_time: formatTime(formData.end_time),
            day: formData.day,
            is_available: formData.is_available,
            sub_specialization_id: formData.sub_specialization_id,
          },
          token: user?.token,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchDoctorSchedules(user.id));
          setDialogOpen(false);
          setEditing(null);
          setFormData({ day: "", start_time: "", end_time: "", is_available: 1, sub_specialization_id: "" });
        })
        .catch((err) => setFormError(err || "صار خطأ أثناء التعديل"));
    } else {
      const payload = {
        day: formData.day,
        start_time: formatTime(formData.start_time),
        end_time: formatTime(formData.end_time),
        is_available: 1,
        sub_specialization_id: formData.sub_specialization_id,
      };

      dispatch(addDoctorSchedule({ scheduleData: payload, token: user?.token }))
        .unwrap()
        .then(() => {
          dispatch(fetchDoctorSchedules(user.id));
          setDialogOpen(false);
          setFormData({ day: "", start_time: "", end_time: "", is_available: 1, sub_specialization_id: "" });
        })
        .catch((err) => setFormError(err?.message || "صار خطأ أثناء الإضافة"));
    }
  };

  // ✅ تحديث حضور المريض
  // const handleAttendance = (appointmentId, attended) => {
  //   dispatch(updateAppointmentAttendance({ appointmentId, attended }))
  //     .unwrap()
  //     .then(() => {
  //       dispatch(fetchAppointmentsByStatus({ doctorId: user.id, status: statusTab, token: user?.token }));
  //     })
  //     .catch((err) => console.error("Attendance update error:", err));
  // };
  const handleAttendance = (appointmentId, attended) => {
  dispatch(updateAppointmentAttendance({ appointmentId, attended }))
    .unwrap()
    .then(() => {
      dispatch(fetchAppointmentsByStatus({
        doctorId: user.id,
        status: statusTab,
        token: user?.token
      }));
    })
    .catch((err) => {
      console.error("Attendance update error:", err);
      setSnackbarMessage(err?.error || "حدث خطأ أثناء تحديث الحضور");
      setSnackbarOpen(true);
    });
};


    // ✅ إضافة تقرير
  const handleAddReport = () => {
    if (!reportContent.trim()) return;
    dispatch(addReport({
      patient_id: selectedPatient.id,
      content: reportContent,
      doctor_id: user.id
    }));
  };
  function parseDMYToDate(dateStr) {
  // مثال dateStr: "08-09-2025 09:00:00"
  const [datePart, timePart] = dateStr.split(" ");
  const [day, month, year] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);

  return new Date(year, month - 1, day, hour, minute, second);
  
  
}


  if (loading) {
    return <Box sx={{ p: 4, textAlign: "center" }}><Typography>جاري تحميل بيانات الطبيب...</Typography></Box>;
  }
  if (error) {
    return <Box sx={{ p: 4, textAlign: "center" }}><Typography color="error">خطأ: {error}</Typography></Box>;
  }
  if (!doctor) {
    return <Box sx={{ p: 4, textAlign: "center" }}><Typography>لا توجد بيانات</Typography></Box>;
  }

  return (
    <Box sx={{ minHeight: "100vh", p: 3, background: "linear-gradient(135deg,#CFE8FF 0%, #B8D8FF 35%, #A6C8FF 100%)" }}>
      <Card component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
        sx={{ borderRadius: 4, p: 2, backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.55)" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "340px 1fr" }, gap: 2 }}>
          {/* Left – Doctor card */}
          <Card sx={{ borderRadius: 4, p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Chip icon={<LogoutRoundedIcon />} label="Logout" size="small"
                onClick={() => { dispatch(logoutUser()); navigate("/login"); }}
                sx={{ bgcolor: "#FFE4EC", color: "#B4235A", fontWeight: 600 }} />
            </Box>
            <Stack alignItems="center" spacing={2} sx={{ mt: 1 }}>
              <Avatar src={doctor.image} sx={{ width: 92, height: 92 }} />
              <Typography variant="h6" sx={{ fontWeight: 800 }}>{doctor.name}</Typography>
              <Stack spacing={1.2} sx={{ width: "100%" }}>
                <InfoRow icon={<PersonOutlineRoundedIcon />} text={doctor.specialization_id?.type} />
                <InfoRow icon={<EmailRoundedIcon />} text={doctor.email} />
                <InfoRow icon={<WorkRoundedIcon />} text={doctor.practice} />
              </Stack>
            </Stack>
          </Card>

          {/* Right – Tabs */}
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                <Tab icon={<PersonOutlineRoundedIcon />} label="Profile" />
                <Tab icon={<CalendarMonthRoundedIcon />} label="Schedules" />
                <Tab icon={<CalendarMonthRoundedIcon />} label="Appointments" />
              </Tabs>
              <Divider sx={{ my: 2 }} />

              {/* Schedules */}
              {tab === 1 && (
                <>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6">List of appointments</Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddRoundedIcon />}
                      onClick={() => {
                        setEditing(null);
                        setFormData({ day: "", start_time: "", end_time: "", is_available: 1, sub_specialization_id: "" });
                        setDialogOpen(true);
                      }}
                      sx={{ borderRadius: 3, textTransform: "none" }}
                    >
                      Add Appointment
                    </Button>
                  </Box>

                  <List sx={{ mt: 2 }}>
                    {schedulesLoading ? (
                      <CircularProgress />
                    ) : schedulesError ? (
                      <Typography color="error">{schedulesError}</Typography>
                    ) : schedules.map((a) => (
                      <Card key={a.id} sx={{ mb: 1, p: 1 }}>
                        <ListItem
                          secondaryAction={
                            <IconButton onClick={() => {
                              setEditing(a);
                              setFormData({
                                day: a.day,
                                start_time: a.start_time?.slice(0, 5),
                                end_time: a.end_time?.slice(0, 5),
                                is_available: a.is_available,
                                sub_specialization_id: a.sub_specialization_id ?? a.sub_specialization?.id ?? "",
                              });
                              setDialogOpen(true);
                            }}>
                              <EditRoundedIcon />
                            </IconButton>
                          }>
                          <CheckCircleRoundedIcon style={{ marginTop: 6 }} />
                          <ListItemText
                            primary={`${a.day}, ${a.start_time} - ${a.end_time}`}
                            secondary={a.sub_specialization?.name}
                          />
                        </ListItem>
                      </Card>
                    ))}
                  </List>
                </>
              )}

             {/* Appointments */}
{tab === 2 && (
  <>
    <Tabs value={statusTab} onChange={(_, v) => setStatusTab(v)}>
      {statuses.map((s) => (
        <Tab key={s.key} label={s.label} value={s.key} />
      ))}
    </Tabs>
    <Divider sx={{ my: 2 }} />
    {appointmentsLoading ? (
      <CircularProgress />
    ) : (
      <List>
        {appointments[statusTab]?.length > 0 ? (
          appointments[statusTab].map((app) => (
            <Card key={app.id} sx={{ mb: 1, p: 1 }}>
              <ListItem
                secondaryAction={
                  statusTab === "pending" ? (
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        
                        onClick={() => handleAttendance(app.id, 1)}
                        
                      >
                        completed
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        
                        onClick={() => handleAttendance(app.id, 0)}
                      >
                       no_show                        
                      </Button>
                    </Stack>
                  ) : statusTab === "completed" ? (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        setSelectedPatient(app.patient);
                        setReportDialogOpen(true);
                      }}
                    >
                      Add Report
                    </Button>
                  ) : null
                }
              >
                <ListItemText
                  primary={`${app.patient.name} - ${app.date}`}
                  secondary={`${app.sub_specialization?.name} (${app.status})`}
                />
              </ListItem>
            </Card>
          ))
        ) : (
          <Typography>لا يوجد مواعيد</Typography>
        )}
      </List>
    )}
    <Snackbar
  open={snackbarOpen}
  autoHideDuration={4000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
  <Alert
    onClose={() => setSnackbarOpen(false)}
    severity="warning"
    sx={{ width: "100%" }}
  >
    {snackbarMessage}
  </Alert>
</Snackbar>

    
  </>
)}

            </CardContent>
          </Card>
        </Box>
      </Card>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "تعديل الموعد" : "إضافة موعد جديد"}</DialogTitle>
        <DialogContent dividers>
          <TextField select margin="dense" label="Day" name="day"
            value={formData.day} onChange={handleChange} fullWidth>
            {daysOfWeek.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </TextField>
          <TextField margin="dense" type="time" label="Start Time" name="start_time"
            value={formData.start_time} onChange={handleChange} fullWidth />
          <TextField margin="dense" type="time" label="End Time" name="end_time"
            value={formData.end_time} onChange={handleChange} fullWidth />

          {/* 🟢 نوع الحجز */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="sub-spec-label">نوع الحجز</InputLabel>
            <Select
              labelId="sub-spec-label"
              label="نوع الحجز"
              name="sub_specialization_id"
              value={formData.sub_specialization_id || ""}
              onChange={handleChange}
              disabled={!!editing || subSpecsLoading}
            >
              {subSpecsLoading ? (
                <MenuItem disabled>جاري التحميل...</MenuItem>
              ) : subSpecsError ? (
                <MenuItem disabled>خطأ: {subSpecsError}</MenuItem>
              ) : subSpecializations?.length ? (
                subSpecializations.map((sub) => (
                  <MenuItem key={sub.id} value={sub.id}>
                    <Box>
                      <Typography fontWeight="bold">{sub.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        مدة: {sub.duration} دقيقة
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>لا توجد أنواع حجز</MenuItem>
              )}
            </Select>
          </FormControl>

          {formError && <Typography color="error" sx={{ mt: 1 }}>{formError}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>إلغاء</Button>
          <Button onClick={handleSubmit} variant="contained">{editing ? "تحديث" : "حفظ"}</Button>
        </DialogActions>
      </Dialog>

            {/* Dialog إضافة تقرير */}
      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>إضافة تقرير للمريض</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>{selectedPatient?.name}</Typography>
          <TextField
            label="محتوى التقرير"
            multiline
            rows={4}
            fullWidth
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
          />
          {reportError && <Typography color="error" sx={{ mt: 1 }}>{reportError}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>إلغاء</Button>
          <Button variant="contained" onClick={handleAddReport} disabled={reportLoading}>
            {reportLoading ? "جاري الحفظ..." : "حفظ"}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

function InfoRow({ icon, text }) {
  return (
    <Stack direction="row" spacing={1.2} alignItems="center">
      <Box sx={{ width: 32, height: 32, borderRadius: 1.5, display: "grid", placeItems: "center", background: "#EEF5FF", color: "#1D4ED8" }}>
        {icon}
      </Box>
      <Typography>{text}</Typography>
    </Stack>
  );
}
