import { Box, Grid, Typography, Link, TextField, Button } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { blue, grey, purple } from "@mui/material/colors";

const Footer = () => {
  return (
    <Box sx={{ mt: 40,  backgroundColor: '#1E3A5F', color: grey[300] }}>
      <Box sx={{ px: { xs: 3, sm: 10 }, py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
              Meditest
            </Typography>
            <Typography variant="body2">
              منصة رائدة تقدم استشارات وخدمات طبية بجودة عالية.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
              الخدمات
            </Typography>
            <Link href="#" color="inherit" display="block" underline="none" mb={0.5}>الاستشارات</Link>
            <Link href="#" color="inherit" display="block" underline="none" mb={0.5}>المواعيد</Link>
            <Link href="#" color="inherit" display="block" underline="none" mb={0.5}>الخدمات المنزلية</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
              الأمان
            </Typography>
            <Link href="#" color="inherit" display="block" underline="none" mb={0.5}>سياسة الخصوصية</Link>
            <Link href="#" color="inherit" display="block" underline="none" mb={0.5}>الشروط والأحكام</Link>
            <Link href="#" color="inherit" display="block" underline="none" mb={0.5}>الأسئلة الشائعة</Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" fontWeight="bold" gutterBottom>
              تواصل معنا
            </Typography>
            <Typography variant="body2" mb={1}>الهاتف: +966-123-456789</Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Link href="#"><Facebook sx={{ color: grey[300] }} /></Link>
              <Link href="#"><Twitter sx={{ color: grey[300] }} /></Link>
              <Link href="#"><Instagram sx={{ color: grey[300] }} /></Link>
              <Link href="#"><LinkedIn sx={{ color: grey[300] }} /></Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: "center", py: 1, borderTop: "1px solid #444" }}>
        <Typography variant="body2" color="text.secondary">
          © 2025 جميع الحقوق محفوظة | Meditest
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
