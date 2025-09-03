import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addReport, clearReportStatus } from "../slices/reportsSlice";

const AddReportSection = ({ doctorId, token }) => {
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector(
    (state) => state.reportsSlice
  );

  const [patientId, setPatientId] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!patientId || !content.trim()) return;

    const reportData = {
      patient_id: patientId,
      doctor_id: doctorId,
      content,
    };

    dispatch(addReport({ reportData, token }));
  };

  // ⏳ مسح الرسائل بعد 3 ثواني
  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearReportStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: "16px",
        backgroundColor: "#f9f9f9",
        maxWidth: 700,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: "#1E3A5F", textAlign: "center" }}
      >
        إضافة تقرير طبي جديد
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <TextField
        label="معرّف المريض (Patient ID)"
        fullWidth
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        sx={{ mb: 2, backgroundColor: "white", borderRadius: "8px" }}
      />

      <TextField
        label="محتوى التقرير"
        fullWidth
        multiline
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mb: 2, backgroundColor: "white", borderRadius: "8px" }}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            backgroundColor: "#1E3A5F",
            color: "white",
            px: 5,
            py: 1.5,
            borderRadius: "30px",
            "&:hover": { backgroundColor: "#163250" },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "إضافة التقرير"}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddReportSection;
