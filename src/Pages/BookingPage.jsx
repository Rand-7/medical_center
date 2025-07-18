import { Box, Typography, TextField, Button, MenuItem, Grid, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const specialties = [
  { label: "القلبية", value: "cardiology" },
  { label: "الجلدية", value: "dermatology" },
  { label: "العظمية", value: "orthopedics" },
  { label: "النسائية", value: "gynecology" },
];

const BookingPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      specialty: "",
      date: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("الاسم مطلوب"),
      phone: Yup.string().required("رقم الهاتف مطلوب"),
      specialty: Yup.string().required("اختيار الاختصاص مطلوب"),
      date: Yup.string().required("تاريخ الموعد مطلوب"),
    }),
    onSubmit: (values) => {
      alert("تم إرسال الحجز بنجاح!\n" + JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box sx={{ p: 4, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="#1E3A5F" mb={3} textAlign="center">
          حجز موعد طبي
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="الاسم الكامل"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="رقم الهاتف"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="الاختصاص الطبي"
                name="specialty"
                value={formik.values.specialty}
                onChange={formik.handleChange}
                error={formik.touched.specialty && Boolean(formik.errors.specialty)}
                helperText={formik.touched.specialty && formik.errors.specialty}
              >
                {specialties.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                name="date"
                label="تاريخ الموعد"
                InputLabelProps={{ shrink: true }}
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5, fontSize: 16, backgroundColor: "#1E3A5F" }}>
                تأكيد الحجز
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default BookingPage;
