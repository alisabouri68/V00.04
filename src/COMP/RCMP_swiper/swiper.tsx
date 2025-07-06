import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import { Autoplay } from 'swiper/modules';
import pic1 from "../../ASST/images/blossom2.jpg";

export default function App() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]} // فقط Autoplay اگر می‌خواهید
      >
        {[...Array(9)].map((_, index) => (
          <SwiperSlide key={index}>
            <img 
              src={pic1} 
              alt="" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}