// import { Box, Typography, Avatar, Grid } from "@mui/material";
// import { useParams } from "react-router-dom";  // للوصول إلى معلمات الرابط
// import { doctorsData } from "../data";  // بيانات الأطباء

// const DoctorDetailsPage = () => {
//   const { index } = useParams();  // الوصول إلى الـ index من الرابط
//   const doctor = doctorsData.find((doc, idx) => idx === parseInt(index));  // البحث عن الدكتور باستخدام الـ index

//   if (!doctor) return <Typography>الدكتور غير موجود</Typography>;  // في حال لم يتم العثور على الدكتور

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Grid container spacing={4} justifyContent="center">
//         <Grid item xs={12} sm={6} md={4}>
//           {/* الصورة الكبيرة */}
//           <Avatar
//             alt={doctor.name}
//             src={doctor.image}
//             sx={{ width: "100%", height: "auto", borderRadius: "16px" }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={8}>
//           <Typography variant="h4" gutterBottom>
//             {doctor.name}
//           </Typography>
//           <Typography variant="h6" color="text.secondary" mb={2}>
//             {doctor.specialty}
//           </Typography>
//           <Typography variant="body1" paragraph>
//             {/* معلومات الدكتور (مثل السيرة الذاتية) */}
//             {doctor.bio}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {/* تفاصيل إضافية إذا كانت موجودة */}
//             {doctor.additionalDetails}
//           </Typography>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default DoctorDetailsPage;
