import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  keyframes,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from "../assets/img/Logo.jpg";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../slices/authSlice'; // تأكد من مسار الاستيراد
import { clearPatientData } from '../slices/patientSlice'; // تأكد من مسار الاستيراد

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
      localStorage.removeItem("medical_info");
      await dispatch(logoutUser()).unwrap();
      dispatch(clearPatientData());
      navigate("/");
    } catch (err) {
      console.error("خطأ بتسجيل الخروج:", err);
    }
  };

  const handleProfile = () => {
    navigate('/patient'); // أو المسار الخاص بصفحة بروفايل المريض عندك
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", p: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        {/* اللوجو */}
        <Box>
          <img src={logo} alt="Logo" width={70} height={70} style={{ objectFit: "contain" }} />
        </Box>

        {/* أزرار + مؤشر الصحة */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
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
            <>
              <Tooltip title="الملف الشخصي">
                <IconButton onClick={handleProfile} color="primary" size="large">
                  <AccountCircleIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title="تسجيل الخروج">
                <IconButton onClick={handleLogout} color="primary" size="large">
                  <LogoutIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </>
          )}

          {/* مؤشر الصحة - قلب ينبض */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FavoriteIcon
            sx={{
              fontSize: 30,
              color: "green",
              animation: `${pulse} 1.2s infinite ease-in-out`,
            }}
          />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LogoSearch;
