// components/SpecialtiesCarousel.js

import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { specialties } from "../data";
import { motion } from "framer-motion";
import { useRef } from "react";

const SpecialtiesCarousel = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  return (
    <Box sx={{ p: 4, overflow: "hidden", position: "relative" }}>
      <Typography
        mb={4}
        variant="h4"
        fontWeight="bold"
        color="#1E3A5F"
        textAlign="center"
      >
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
              backgroundImage: `url(${spec.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              scrollSnapAlign: "center",
              transition: "0.4s ease",
              flexShrink: 0,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => navigate(`/specialty/${spec.id}`)}
          />
        ))}
      </motion.div>
    </Box>
  );
};

export default SpecialtiesCarousel;
