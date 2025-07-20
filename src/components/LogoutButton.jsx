import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, clearLogoutStatus } from '../slices/authSlice';
import { Button, Snackbar, Alert } from '@mui/material';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { loading, error, logoutStatus } = useSelector(state => state.auth);
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(clearLogoutStatus());
  };

  return (
    <>
      <Button variant="outlined" color="error" onClick={handleLogout} disabled={loading}>
        {loading ? 'جاري تسجيل الخروج...' : 'تسجيل الخروج'}
      </Button>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        {error ? (
          <Alert onClose={handleClose} severity="error" variant="filled">{error}</Alert>
        ) : (
          <Alert onClose={handleClose} severity="success" variant="filled">{logoutStatus}</Alert>
        )}
      </Snackbar>
    </>
  );
};

export default LogoutButton;
