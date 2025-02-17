'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function CauseImageCarousel(props: any) {
    return (
        <Swiper
            modules={[Navigation, Autoplay, Pagination, Mousewheel]}
            pagination
            loop
            mousewheel
            slidesPerView={2}
            autoplay={{ delay: 5000 }}
            className="h-fit w-full"
            spaceBetween={20}
            breakpoints={{
                728: {
                    slidesPerView: 5,
                },
            }}
        >
            {props.children.map((item: any, index: number) => (
                <SwiperSlide
                    key={index}
                    className="flex items-center justify-center max-md:-mb-4 max-md:pb-12"
                >
                    {item}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
