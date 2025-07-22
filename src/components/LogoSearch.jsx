import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  keyframes
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import logo from "../assets/img/Logo.jpg";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../slices/authSlice'; // تأكد من مسار الاستيراد
import { clearPatientData } from '../slices/patientSlice'; // تأكد من مسار الاستيراد

// أنيميشن نبض القلب
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const LogoSearch = () => {
  const [healthScore] = useState(85);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      // تنظيف البيانات المخزنة محليًا
      localStorage.removeItem("medical_info");
      await dispatch(logoutUser()).unwrap();
      dispatch(clearPatientData()); // مسح بيانات المريض من Redux store
      navigate("/");
    } catch (err) {
      console.error("خطأ بتسجيل الخروج:", err);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", p: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        {/* اللوجو */}
        <Box>
          <img src={logo} alt="Logo" width={70} height={70} style={{ objectFit: "contain" }} />
        </Box>

        {/* أزرار + مؤشر الصحة */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {!user ? (
            <>
              <Button
                onClick={handleRegister}
                variant="contained"
                sx={{
                  backgroundColor: '#1E3A5F',
                  color: '#fff',
                  borderRadius: 5,
                  px: 3,
                  py: 1,
                  fontSize: '1rem',
                }}
              >
                Register
              </Button>
              <Button
                onClick={handleLogin}
                variant="contained"
                sx={{
                  backgroundColor: '#1E3A5F',
                  color: '#fff',
                  borderRadius: 5,
                  px: 3,
                  py: 1,
                  fontSize: '1rem',
                }}
              >
                Login
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              variant="outlined"
              sx={{
                borderColor: '#1E3A5F',
                color: '#1E3A5F',
                borderRadius: 5,
                px: 3,
                py: 1,
                fontSize: '1rem',
              }}
            >
              Logout
            </Button>
          )}

          {/* مؤشر الصحة - قلب ينبض */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FavoriteIcon
              sx={{
                fontSize: 30,
                color: healthScore > 70 ? 'green' : healthScore > 40 ? 'orange' : 'red',
                animation: `${pulse} 1.2s infinite ease-in-out`
              }}
            />
            <Typography sx={{ fontWeight: 'bold', color: '#333', fontSize: '0.9rem' }}>
              {healthScore}%
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LogoSearch;
