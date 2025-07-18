import girl from '../src/assets/img/girl.jpg'
import baby from '../src/assets/img/baby.jpg'
import heart from '../src/assets/img/heart.jpg'
import ear from '../src/assets/img/ear.jpg'
import eye from '../src/assets/img/eye.jpg'


export const specialties = [
    { id: "pediatrics", name: "أطفال" ,image:baby },
    { id: "gynecology", name: "عينية",image:eye },
    { id: "orthopedics", name: "اذنية",image:ear },
    { id: "cardiology", name: "قلبية",image:heart },
  ];
  
  export const doctorsData = {
    pediatrics: [
      { name: "د. أحمد", specialty: "أطفال", image:girl, experience: 12,
      rating: 4.7,
      availableTimes: ['10:00 ص', '12:00 م', '4:30 م'],id:1 },

      { name: "د. ريم", specialty: "أطفال", image:girl , experience: 12,
      rating: 4.7,
      availableTimes: ['10:00 ص', '12:00 م', '4:30 م'],id:2},
    ],
    gynecology: [
      { name: "د. سارة", specialty: "نسائية", image:girl, experience: 12,
      rating: 4.7,
      availableTimes: ['10:00 ص', '12:00 م', '4:30 م'],id:3 },

      { name: "د. ريم", specialty: "أطفال", image:girl, experience: 12,
      rating: 4.7,
      availableTimes: ['10:00 ص', '12:00 م', '4:30 م'],id:4}
    ],
    orthopedics: [
      { name: "د. طلال", specialty: "عظمية",image:girl, experience: 12,
      rating: 4.7,
      availableTimes: ['10:00 ص', '12:00 م', '4:30 م'], id:5},
    ],
    cardiology: [
      { name: "د. فادي", specialty: "قلبية",image:girl,experience: 12,
      rating: 4.7,
      availableTimes: ['10:00 ص', '12:00 م', '4:30 م'],id:6 },
    ],
  };
  
  export const featuredDoctors = [
  {
    id: "d1",
    name: "د. سارة يوسف",
    image: "/images/doctors/sara.jpg",
    specialty: "أمراض داخلية",
    specialtyId: "internal"
  },
  {
    id: "d2",
    name: "د. محمود علي",
    image: "/images/doctors/mahmoud.jpg",
    specialty: "جلدية وتجميل",
    specialtyId: "derma"
  },
  {
    id: "d3",
    name: "د. أمل الخطيب",
    image: "/images/doctors/amal.jpg",
    specialty: "طب الأطفال",
    specialtyId: "pediatrics"
  }
];
export const appointmentTypes = {
  cardiology: ['استشارة أول مرة', 'متابعة دورية', 'تحاليل قلب'],
  gynecology: ['استشارة نسائية', 'فحص دوري', 'حمل وولادة'],
  ophthalmology: ['فحص نظر', 'متابعة عملية', 'كشف مبدئي'],
  ent: ['فحص سمع', 'تنظيف أذن', 'استشارة أذنية'],
};
