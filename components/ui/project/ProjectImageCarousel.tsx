'use client'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function ProjectImageCarousel(props: any) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            pagination
            slidesPerView={1}
            loop
            className="w-full"
        >
            {props.children.map((item: any, index: number) => (
                <SwiperSlide key={index}>{item}</SwiperSlide>
            ))}
        </Swiper>
    )
}
