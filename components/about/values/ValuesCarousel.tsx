'use client'
import { Autoplay, Navigation, Pagination, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export default function ValuesCarousel(props: any) {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay, Mousewheel]}
            pagination
            slidesPerView={1}
            loop
            className="w-full"
            autoplay={{
                delay: 5000,
            }}
            spaceBetween={30}
            breakpoints={{
                728: {
                    slidesPerView: 3,
                },
            }}
            centeredSlides={false}
            centerInsufficientSlides={true}
            mousewheel
        >
            {props.children.map((element: any, index: number) => (
                <SwiperSlide
                    key={index}
                    className="pb-16 flex justify-center items-center"
                >
                    {element}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
