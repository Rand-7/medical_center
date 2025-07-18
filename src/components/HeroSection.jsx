import { Box, Typography, Container } from "@mui/material";
import Lottie from "lottie-react";
import doctorAnimation from "../assets/animations/Animation - 1748892396892.json"; // حمّلي ملف JSON للأنيميشن
import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "500px",
        background: "linear-gradient(to bottom right, #e3f2fd, #bbdefb)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 5,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Text Content */}
        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" }, mb: { xs: 4, md: 0 } }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#0d47a1", fontFamily: "Tajawal, sans-serif" }}
          >
            <Typewriter
              words={["احجز موعدك بسهولة", "أفضل الأطباء بين يديك", "رعايتك أولويتنا"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, color: "#1565c0" }}>
            !كل ما تحتاجه من خدمات طبية في مكان واحد
          </Typography>
        </Box>

        {/* Animation */}
        <Box sx={{ flex: 1, maxWidth: 400 }}>
          <Lottie animationData={doctorAnimation} loop autoplay />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
