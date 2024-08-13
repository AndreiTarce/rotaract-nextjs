'use client'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function ProjectImageCarousel(props: any) {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination
            slidesPerView={1}
            loop
            className="w-full"
            autoplay={{ delay: 5000 }}
        >
            {props.children.map((item: any, index: number) => (
                <SwiperSlide key={index} className="pb-16">
                    {item}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
