
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import banner1 from "../../../assets/banner/banner1.jfif";
import banner2 from "../../../assets/banner/banner2.jfif";
import banner3 from "../../../assets/banner/banner3.jfif";
import banner4 from "../../../assets/banner/banner4.jfif";
import banner5 from "../../../assets/banner/banner5.jfif";
import banner6 from "../../../assets/banner/banner6.jfif";


const Banner = () => {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
      >
        <SwiperSlide>
          <div className="relative w-full h-[50vh] lg:h-[600px] flex flex-col items-center justify-center">
            <img
              src={banner1}
              alt="Find Your Next Opportunity"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 text-gray-200 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] flex flex-col items-center justify-center">
              <h1 className="md:text-4xl text-3xl w-5/6 text-center font-extrabold">
                Unlock Your English Potential
              </h1>
              <p className="text-lg mt-3 font-medium w-5/6 mx-auto text-center">
                Join our platform and master English with expert guidance and
                interactive learning tools.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[50vh] lg:h-[600px] flex flex-col items-center justify-center">
            <img
              src={banner2}
              alt="Find Your Next Opportunity"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 text-gray-200 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] flex flex-col items-center justify-center">
              <h1 className="md:text-4xl text-3xl w-5/6 text-center font-extrabold">
                Master English with Expert Tutors
              </h1>
              <p className="text-lg font-medium mt-6 w-5/6 mx-auto text-center">
                Connect with certified tutors who will guide you on your journey
                to fluency.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[50vh] lg:h-[600px] flex flex-col items-center justify-center">
            <img
              src={banner3}
              alt="Find Your Next Opportunity"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 text-gray-200 bg-gradient-to-r from-[#151515] to-[rgba{21, 21, 21, 0.00)] flex flex-col items-center justify-center">
              <h1 className="md:text-4xl text-3xl w-5/6 text-center font-extrabold">
                Empower Your Communication Skills
              </h1>
              <p className="text-lg font-medium mt-6 w-5/6 mx-auto text-center">
                Enhance your ability to communicate effectively with our
                targeted language programs
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[50vh] lg:h-[600px] flex flex-col items-center justify-center">
            <img
              src={banner4}
              alt="Find Your Next Opportunity"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 text-gray-200 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] flex flex-col items-center justify-center">
              <h1 className="md:text-4xl text-3xl w-5/6 text-center font-extrabold">
                Speak English Like a Pro
              </h1>
              <p className="text-lg font-medium mt-6 w-5/6 mx-auto text-center">
                Develop the skills to speak English fluently and professionally
                in any situation.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[50vh] lg:h-[600px] flex flex-col items-center justify-center">
            <img
              src={banner5}
              alt="Find Your Next Opportunity"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 text-gray-200 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] flex flex-col items-center justify-center">
              <h1 className="md:text-4xl text-3xl w-5/6 text-center font-extrabold">
                Engage, Learn, Succeed
              </h1>
              <p className="text-lg font-medium mt-6 w-5/6 mx-auto text-center">
                Engage with our resources, learn effectively, and succeed in
                mastering English.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-[50vh] lg:h-[600px] flex flex-col items-center justify-center">
            <img
              src={banner6}
              alt="Find Your Next Opportunity"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 text-gray-200 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] flex flex-col items-center justify-center">
              <h1 className="md:text-4xl text-3xl w-5/6 text-center font-extrabold">
                Empower Your Future
              </h1>
              <p className="text-lg font-medium mt-6 w-5/6 mx-auto text-center">
                Empower yourself with the tools and opportunities needed to
                succeed in today&apos;s competitive job market.
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

Banner.propTypes = {};

export default Banner;
