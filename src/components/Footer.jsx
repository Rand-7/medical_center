// src/components/Footer.jsx
import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  // 🔹 روابط الصفحات الداخلية
  const servicesLinks = [
    { label: "الاستشارات", to: "/consultations" },
    { label: "المواعيد", to: "/appointments" },
    { label: "الخدمات المنزلية", to: "/home-services" },
  ];

  const securityLinks = [
    { label: "سياسة الخصوصية", to: "/privacy-policy" },
    { label: "الشروط والأحكام", to: "/terms" },
    { label: "الأسئلة الشائعة", to: "/faq" },
  ];

  // 🔹 روابط السوشال ميديا (ممكن تربطيها بحساباتك)
  const socialLinks = [
    { icon: <Facebook />, url: "https://facebook.com" },
    { icon: <Twitter />, url: "https://twitter.com" },
    { icon: <Instagram />, url: "https://instagram.com" },
    { icon: <LinkedIn />, url: "https://linkedin.com" },
  ];

  return (
    <Box sx={{ mt: 20, backgroundColor: "#1E3A5F", color: grey[300] }}>
      <Box sx={{ px: { xs: 3, sm: 10 }, py: 5 }}>
        <Grid container spacing={4}>
          {/* شعار ووصف */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
              Meditest
            </Typography>
            <Typography variant="body2">
              منصة رائدة تقدم استشارات وخدمات طبية بجودة عالية.
            </Typography>
          </Grid>

          {/* الخدمات */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
              الخدمات
            </Typography>
            {servicesLinks.map((link, i) => (
              <Link
                key={i}
                component={RouterLink}
                to={link.to}
                color="inherit"
                display="block"
                underline="none"
                sx={{ mb: 0.5, "&:hover": { color: "white" } }}
              >
                {link.label}
              </Link>
            ))}
          </Grid>

          {/* الأمان */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
              الأمان
            </Typography>
            {securityLinks.map((link, i) => (
              <Link
                key={i}
                component={RouterLink}
                to={link.to}
                color="inherit"
                display="block"
                underline="none"
                sx={{ mb: 0.5, "&:hover": { color: "white" } }}
              >
                {link.label}
              </Link>
            ))}
          </Grid>

          {/* تواصل معنا */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
              تواصل معنا
            </Typography>
            <Typography variant="body2" mb={1}>
              الهاتف: +966-123-456789
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              {socialLinks.map((s, i) => (
                <IconButton
                  key={i}
                  component="a"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: grey[300], "&:hover": { color: "white" } }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* حقوق الملكية */}
      <Box sx={{ textAlign: "center", py: 1, borderTop: "1px solid #444" }}>
        <Typography variant="body2" sx={{ color: grey[400] }}>
          © 2025 جميع الحقوق محفوظة | Meditest
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
