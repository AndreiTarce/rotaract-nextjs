'use client'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function CauseImageCarousel(props: any) {
    return (
        <Swiper
            modules={[Navigation, Autoplay, Pagination, Mousewheel]}
            pagination
            loop
            mousewheel
            slidesPerView={2}
            autoplay={{ delay: 5000 }}
            className="w-full h-fit"
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
                    className="flex justify-center items-center"
                >
                    {item}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
