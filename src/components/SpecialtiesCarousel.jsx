// src/Pages/SpecialtiesCarousel.jsx
import { Box, Typography, CircularProgress, Grid, Card, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecializations } from "../slices/specializationSlice";
import { Stethoscope, HeartPulse, Brain, Bone, Baby, Microscope, Syringe, Scan, User, Eye, Ear } from "lucide-react";

const iconMap = {
  "جلدية": <User size={40} color="#1E3A5F" />,
  "قلبية": <HeartPulse size={40} color="red" />,
  "عصبية": <Brain size={40} color="#6a1b9a" />,
  "عظمية": <Bone size={40} color="#795548" />,
  "أطفال": <Baby size={40} color="#0277bd" />,
  "تحاليل": <Microscope size={40} color="#2e7d32" />,
  "لقاحات": <Syringe size={40} color="#00838f" />,
  "أشعة": <Scan size={40} color="#f57c00" />,
  "عينية": <Eye size={40} color="#0288d1" />,
  "أذنية": <Ear size={40} color="#6d4c41" />,
  "نسائية": <HeartPulse size={40} color="#d81b60" />,
};

const defaultIcon = <Stethoscope size={40} color="#1E3A5F" />;

const SpecialtiesCarousel = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const { items: specialties = [], loading, error } = useSelector(state => state.specializations || {});

  useEffect(() => {
    dispatch(fetchSpecializations());
  }, [dispatch]);

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Typography color="error" align="center" mt={4}>{error}</Typography>
  );

  return (
    <Box sx={{ p: 4, overflow: "hidden", position: "relative" }}>
      <Typography mb={4} variant="h4" fontWeight="bold" color="#1E3A5F" textAlign="center">
        التخصصات الطبية
      </Typography>

      <motion.div
        ref={carouselRef}
        style={{
          display: "flex",
          gap: "225px",
          cursor: "grab",
          overflowX: "auto",
          padding: "10px",
          scrollSnapType: "x mandatory",
        }}
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {specialties.map((spec) => (
          <motion.div
            key={spec.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              minWidth: 200,
              height: 120,
              borderRadius: "50%",
              border: "3px solid #bbdefb",
              backgroundColor: "#f0f4f8",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              scrollSnapAlign: "center",
              transition: "0.4s ease",
              flexShrink: 0,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => navigate(`/specialty/${spec.id}`, { state: { specializationId: spec.id, specialtyName: spec.type } })}
          >
            {iconMap[spec.type] || defaultIcon}
            <Typography fontWeight="bold" color="#1E3A5F" sx={{ mt: 1, fontSize: "1rem" }}>
              {spec.type}
            </Typography>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
};

export default SpecialtiesCarousel;
