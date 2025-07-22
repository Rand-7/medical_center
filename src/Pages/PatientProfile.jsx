import React, { useEffect, useState } from "react";
import {
  Box, Grid, Paper, Typography, Divider, List, ListItem, ListItemText,
  Button, Link, Chip, Drawer, ListItemIcon, ListItemButton, Toolbar, TextField, Dialog,
  DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatient, updatePatient, clearUpdateStatus, clearPatientData } from "../slices/patientSlice";
import { logoutUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const PatientProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patientId = 1;

  const { data: patient, loading, error, updateStatus } = useSelector((state) => state.patient);
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLocked, setIsLocked] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);

const { token } = useSelector((state) => state.auth); // 👈 جبنا التوكن من الauth

useEffect(() => {
  if (token) {
    dispatch(fetchPatient(patientId));
  }
}, [dispatch, patientId, token]); 

  useEffect(() => {
    if (patient) {
      const localData = JSON.parse(localStorage.getItem("medical_info"));
      const mergedData = localData ? { ...patient, ...localData } : patient;
      setFormData(mergedData);
      setIsLocked(localData ? true : false);
      setIsFirstTime(!localData);
    }
  }, [patient]);

  // ** التعديل الأساسي هنا: إعادة تعيين formData وحالة القفل عند مسح بيانات المريض **
  useEffect(() => {
    if (!patient) {
      setFormData({});
      setIsLocked(true);
      setIsFirstTime(true);
    }
  }, [patient]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(clearPatientData());           // مسح بيانات المريض من الstore
      localStorage.removeItem("medical_info"); // مسح الحساسية والأمراض من localStorage
      setFormData({});  // تنظيف الفورم داتا صراحة
setIsLocked(true);
setIsFirstTime(true);
      navigate("/");
    } catch (err) {
      console.error("خطأ بتسجيل الخروج:", err);
    }
  };

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
    dispatch(clearUpdateStatus());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocalSave = () => {
    const localFields = {
      allergies: formData.allergies,
      chronicDiseases: formData.chronicDiseases,
      bloodType: formData.bloodType,
      pastIllnesses: formData.pastIllnesses
    };
    localStorage.setItem("medical_info", JSON.stringify(localFields));
    setIsLocked(true);
    setIsFirstTime(false);
  };

  const handleUpdate = async () => {
    try {
      await dispatch(updatePatient({ id: patientId, ...formData })).unwrap();
      setIsLocked(true);
      setEditOpen(false);
    } catch (error) {
      console.error("فشل تحديث البيانات:", error);
    }
  };

  const futureVisits = [
    { date: "2025-06-26", time: "11:00", service: "تنظيف أسنان", doctor: "د. علا أحمد", status: "مجدول" },
    { date: "2025-07-01", time: "12:30", service: "فحص نظر", doctor: "د. سامي خليل", status: "مجدول" },
  ];

  const files = [
    { name: "نتيجة الفحص.pdf", size: "123kb" },
    { name: "وصفة طبية.pdf", size: "87kb" },
  ];

  const notes = [
    { name: "Note 31.06.23.pdf", size: "123kb" },
    { name: "Note 23.06.23.pdf", size: "123kb" },
  ];

  if (loading) return <Typography>جاري التحميل...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!patient) return <Typography>لا توجد بيانات المريض</Typography>;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6fb" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1976d2",
            color: "white",
            borderRadius: "0 40px 40px 0",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" fontFamily="monospace">
            M E D I C A L
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon sx={{ color: "white" }}><HomeIcon /></ListItemIcon>
              <ListItemText primary="الصفحة الرئيسية" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: "white" }}><MedicalServicesIcon /></ListItemIcon>
              <ListItemText primary="خدماتنا" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: "white" }}><LogoutIcon /></ListItemIcon>
              <ListItemText primary="تسجيل الخروج" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Box sx={{ p: 3, borderRadius: "16px", boxShadow: 2, mb: 3, backgroundColor: "#f5f7fb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography fontSize="25px" color="#1976d2" margin="15px">How are you Feeling today ?</Typography>
          <Box display="flex" alignItems="stretch">
            <Box>
              <Typography variant="body1" color="text.secondary">Good Morning !</Typography>
              <Typography variant="h6" fontWeight="bold">{patient.name}</Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, textAlign: "center", borderRadius: "16px 40px" }}>
              <Typography variant="h6" mt={2}>{patient.name}</Typography>
              <Typography variant="body2" color="text.secondary">{patient.phone}</Typography>
              <Typography variant="body2" color="text.secondary">{patient.email}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, mb: 2, borderRadius: "16px 40px" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6">المعلومات العامة</Typography>
                <Button variant="outlined" onClick={handleEditOpen}>تعديل البيانات</Button>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}><strong>تاريخ الميلاد:</strong> {patient.birth_date}</Grid>
                <Grid item xs={6}><strong>العنوان:</strong> {patient.address}</Grid>
                <Grid item xs={6}><strong>تاريخ التسجيل:</strong> {patient.registrationDate || "-"}</Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 2, mb: 2, borderRadius: "16px 40px" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6">الأمراض والحساسية</Typography>
                {isLocked ? (
                  <Button variant="outlined" onClick={() => setIsLocked(false)}>
                    {isFirstTime ? "ادخل الحساسية" : "تعديل الحساسية"}
                  </Button>
                ) : null}
              </Box>
              <Grid container spacing={2}>
                {["allergies", "chronicDiseases", "bloodType", "pastIllnesses"].map(field => (
                  <Grid item xs={6} key={field}>
                    <strong>{{
                      allergies: "الحساسية",
                      chronicDiseases: "أمراض مزمنة",
                      bloodType: "فصيلة الدم",
                      pastIllnesses: "أمراض سابقة"
                    }[field]}</strong>{" "}
                    {isLocked ? (
                      <Typography>{formData[field] || "-"}</Typography>
                    ) : (
                      <TextField
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                      />
                    )}
                  </Grid>
                ))}

                {!isLocked && (
                  <Grid item xs={12} textAlign="right" sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleLocalSave}>حفظ</Button>
                  </Grid>
                )}
              </Grid>
            </Paper>

            <Paper sx={{ p: 2, borderRadius: "16px 40px" }}>
              <Typography variant="h6">الزيارات القادمة</Typography>
              <List>
                {futureVisits.map((visit, idx) => (
                  <ListItem key={idx} divider>
                    <ListItemText primary={`${visit.date} ${visit.time} - ${visit.service}`} secondary={`الطبيب: ${visit.doctor}`} />
                    <Chip label={visit.status} color="primary" />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, mb: 2, borderRadius: "16px 40px" }}>
              <Typography variant="h6">الملفات</Typography>
              {files.map((file, idx) => (
                <Box key={idx} display="flex" justifyContent="space-between" my={1}>
                  <Link href="#">{file.name}</Link>
                  <Typography variant="caption">{file.size}</Typography>
                </Box>
              ))}
              <Button size="small" variant="contained" sx={{ mt: 1 }}>تحميل</Button>
            </Paper>

            <Paper sx={{ p: 2, borderRadius: "16px 40px" }}>
              <Typography variant="h6">ملاحظات</Typography>
              {notes.map((note, idx) => (
                <Box key={idx} display="flex" justifyContent="space-between" my={1}>
                  <Typography>{note.name}</Typography>
                  <Typography variant="caption">{note.size}</Typography>
                </Box>
              ))}
              <Button size="small" variant="outlined" sx={{ mt: 1 }}>تحميل</Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>تعديل بيانات المريض</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField margin="dense" label="الاسم" fullWidth name="name" value={formData.name || ""} onChange={handleChange} />
          <TextField margin="dense" label="الهاتف" fullWidth name="phone" value={formData.phone || ""} onChange={handleChange} />
          <TextField margin="dense" label="البريد الإلكتروني" fullWidth name="email" value={formData.email || ""} onChange={handleChange} />
          <TextField margin="dense" label="العنوان" fullWidth name="address" value={formData.address || ""} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>إلغاء</Button>
          <Button onClick={handleUpdate} variant="contained">حفظ</Button>
        </DialogActions>
        {updateStatus && <Typography textAlign="center" color="success.main" mt={1}>{updateStatus}</Typography>}
      </Dialog>
    </Box>
  );
};

export default PatientProfile;
