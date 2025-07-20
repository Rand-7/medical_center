import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  keyframes,
  Snackbar,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout'; // أيقونة تسجيل خروج
import logo from "../assets/img/Logo.jpg";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, clearLogoutStatus } from '../slices/authSlice';

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
  const { loading, error, logoutStatus } = useSelector(state => state.auth);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setSnackbar({ open: true, message: 'جاري تسجيل الخروج...', severity: 'info' });
  };

  React.useEffect(() => {
    if (logoutStatus) {
      setSnackbar({ open: true, message: logoutStatus, severity: 'success' });
      dispatch(clearLogoutStatus());
      navigate('/login');
    }
    if (error) {
      setSnackbar({ open: true, message: error, severity: 'error' });
      dispatch(clearLogoutStatus());
    }
  }, [logoutStatus, error, dispatch, navigate]);

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
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

          {!user && (
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
          )}

          {user && (
            <Tooltip title="تسجيل الخروج">
              <span>
                <IconButton
                  onClick={handleLogout}
                  color="error"
                  disabled={loading}
                  size="large"
                >
                  <LogoutIcon />
                </IconButton>
              </span>
            </Tooltip>
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default LogoSearch;
