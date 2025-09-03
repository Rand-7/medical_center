import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import LogoSearch from "../components/LogoSearch";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import TopDoctorsSection from "../components/TopDoctorsSection";
import SpecialtiesCarousel from "../components/SpecialtiesCarousel";

import { addOpinion, fetchOpinions, clearSuccessMessage } from "../slices/opinionsSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { opinionsList, loading, error, successMessage } = useSelector((state) => state.opinions);

  const [newReview, setNewReview] = useState("");
  const [patientReviews, setPatientReviews] = useState([]);

  // جلب الآراء عند تحميل الصفحة
  useEffect(() => {
    dispatch(fetchOpinions());
  }, [dispatch]);

  // تحديث state المحلي بعد ما تتحدث قائمة الآراء بالـ store
  useEffect(() => {
    if (opinionsList && Array.isArray(opinionsList)) {
      const sortedOpinions = [...opinionsList].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setPatientReviews(sortedOpinions);
    }
  }, [opinionsList]);

  // مسح رسالة النجاح بعد 3 ثواني
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => dispatch(clearSuccessMessage()), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  const handleAddReview = async () => {
    if (newReview.trim() === "") return;
    try {
      await dispatch(addOpinion(newReview)).unwrap();
      dispatch(fetchOpinions()); // إعادة جلب الآراء بعد الإضافة
      setNewReview("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ px: 2 }}>
      <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", p: 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <LogoSearch />
        </Toolbar>
      </AppBar>

      <HeroSection />
      <SpecialtiesCarousel />
      <TopDoctorsSection />

      {/* قسم آراء المرضى */}
      <Box sx={{ backgroundColor: "#f0f4f8", p: 6, mt: 8 }}>
        <Typography variant="h4" color="#1E3A5F" fontWeight="bold" mb={4} textAlign="center">
          آراء مرضانا
        </Typography>

        {/* إدخال رأي جديد */}
        <Box sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="اكتب رأيك هنا..."
            variant="outlined"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: "12px" }}
          />
          <Button
            variant="contained"
            onClick={handleAddReview}
            sx={{
              mt: 2,
              backgroundColor: "#1E3A5F",
              color: "white",
              px: 4,
              py: 1,
              borderRadius: "20px",
              "&:hover": { backgroundColor: "#163250" },
            }}
          >
            أضف رأيك
          </Button>
        </Box>

        {loading && <CircularProgress sx={{ display: "block", mx: "auto", mb: 2 }} />}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

        {/* عرض الآراء */}
        <Grid container spacing={4} justifyContent="center">
          {patientReviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  boxShadow: '0px 6px 12px rgba(0,0,0,0.1)',
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 10px 20px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
                >
                  “{review.opinion || review.Opinion}”
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textAlign="right"
                  sx={{ mt: 2, fontStyle: 'italic' }}
                >
                  {review.created_at
                    ? new Date(review.created_at).toLocaleDateString('ar-EG')
                    : ""}
                  {" "} - مريض سعيد
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* زر حجز الموعد */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 6, mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/booking")}
          sx={{
            backgroundColor: "#1E3A5F",
            color: "white",
            px: 5,
            py: 1.8,
            fontSize: 20,
            borderRadius: "30px",
            "&:hover": { backgroundColor: "#163250" },
          }}
        >
          احجز موعدك الآن
        </Button>
      </Box>

      <Footer />
    </Box>
  );
};

export default HomePage;
