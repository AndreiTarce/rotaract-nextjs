"use client"
import React, { ReactComponentElement } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ProjectImageCarousel(props) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination
            slidesPerView={1}
            loop
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className="w-full"
        >
            {props.children.map((item: any, index: number) => <SwiperSlide key={index}>{item}</SwiperSlide>)}
        </Swiper>
    );
};