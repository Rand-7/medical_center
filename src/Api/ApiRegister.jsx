import axios from 'axios';

const API_URL = 'http://medical_center.test/api/register';

const mapGenderToApi = (gender) => {
  if (!gender) return 'male'; // قيمة افتراضية
  const normalizedGender = gender.toLowerCase();
  if (normalizedGender === 'male' || normalizedGender === 'ذكر') return 'male';
  if (normalizedGender === 'female' || normalizedGender === 'أنثى' || normalizedGender === 'انثى') return 'female';
  return 'male'; // قيمة افتراضية
};

export const registerUser = async (userData) => {
  try {
    let formattedBirthDate = userData.birth_date;
    if (userData.birth_date && !/^\d{4}-\d{2}-\d{2}$/.test(userData.birth_date)) {
      formattedBirthDate = new Date(userData.birth_date).toISOString().split('T')[0];
    }

    const payload = {
      ...userData,
      birth_date: formattedBirthDate,
      gender: mapGenderToApi(userData.gender),
    };

    // إذا كان الـ API يدعم JSON، نستخدم JSON بدل FormData
    const response = await axios.post(API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return {
      status: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error response:', error.response?.data);
    return {
      status: false,
      message: error.response?.data?.message || error.message || 'فشل الاتصال بالسيرفر',
      statusCode: error.response?.status || 500,
    };
  }
};