'use client'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default function AboutRotaractSlider(props: any) {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination
            slidesPerView={1}
            loop
            className="w-full md:!hidden"
            autoplay={{
                delay: 10000,
            }}
            spaceBetween={30}
        >
            {props.children.map((element: any, index: number) => (
                <SwiperSlide key={index} className="pb-16">
                    {element}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
