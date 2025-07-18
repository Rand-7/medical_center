import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Button,
  TextField
} from "@mui/material";
import LogoSearch from "../components/LogoSearch";
import HeroSection from "../components/HeroSection";
import { specialties } from "../data";
import Footer from "../components/Footer";
import TopDoctorsSection from "../components/TopDoctorsSection";
import SpecialtiesCarousel from "../components/SpecialtiesCarousel"

const HomePage = () => {
  const navigate = useNavigate();

  const [patientReviews, setPatientReviews] = useState([
    "خدمة ممتازة وسرعة في الحجز.",
    "أطباء محترفون وتعامل راقٍ.",
    "تجربة رائعة وسهلة، أنصح بها بشدة!"
  ]);

  const [newReview, setNewReview] = useState("");

  const handleAddReview = () => {
    if (newReview.trim() === "") return;
    setPatientReviews([newReview, ...patientReviews]);
    setNewReview("");
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

      {/* <Box sx={{ p: 2 }}>
        <Typography mb={2} variant="h4" fontWeight="bold" color="#1E3A5F" textAlign="center">
          الاختصاصات الطبية
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {specialties.map((spec) => (
            <Grid item xs={12} sm={6} md={3} key={spec.id}>
              <Box
                onClick={() => navigate(`/specialty/${spec.id}`)}
                sx={{
                  p: 5,
                  height: "120px",
                  width: "180px",
                  border: "2px solid",
                  borderColor: "#ccc",
                  borderRadius: "40px",
                  cursor: "pointer",
                  textAlign: "center",
                  backgroundImage: `url(${spec.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  transition: "0.3s",
                  position: "relative",
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box> */}

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
            sx={{
              backgroundColor: 'white',
              borderRadius: '12px',
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddReview}
            sx={{
              mt: 2,
              backgroundColor: '#1E3A5F',
              color: 'white',
              px: 4,
              py: 1,
              borderRadius: '20px',
              '&:hover': { backgroundColor: '#163250' },
            }}
          >
            أضف رأيك
          </Button>
        </Box>

        {/* عرض الآراء */}
        <Grid container spacing={4} justifyContent="center">
          {patientReviews.map((text, index) => (
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
                  “{text}”
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  textAlign="right"
                  sx={{ mt: 2, fontStyle: 'italic' }}
                >
                  - مريض سعيد
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* زر حجز الموعد */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 6,
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate('/booking')}
          sx={{
            backgroundColor: '#1E3A5F',
            color: 'white',
            px: 5,
            py: 1.8,
            fontSize: 20,
            borderRadius: '30px',
            '&:hover': { backgroundColor: '#163250' },
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
