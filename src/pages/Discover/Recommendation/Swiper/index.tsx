import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { IBanner } from '@/apis/modules/types/personalized';

import 'swiper/css';
import styles from './style.module.scss';

import axios from '@/apis';

const Recommendation = () => {
    const [banners, setBanners] = useState<IBanner[]>([]);
    const getBannerList = async () => {
        const res = await axios.getBanner();
        console.log(res);

        setBanners(res.banners || []);
    };
    useEffect(() => {
        getBannerList();
    }, []);
    return (
        <>
            <Swiper
                spaceBetween={-160}
                slidesPerView={3}
                centeredSlides={true}
                loop={true}
                navigation={true}
                pagination={true}
                initialSlide={3}
                className={styles.mySwiper}
                onSwiper={(swiper) => console.log(banners)}
            >
                {banners.map(({ imageUrl, typeTitle, targetId, targetType }, index) => {
                    return (
                        <>
                            <SwiperSlide key={index} className={styles.swiperSlide}>
                                <div className={styles.bannerItem}>
                                    <img className={styles.imgItem} src={imageUrl} alt='404' />
                                    <span className={styles.typeTitle}>{typeTitle}</span>
                                </div>
                            </SwiperSlide>
                        </>
                    );
                })}
            </Swiper>
        </>
    );
};
export default Recommendation;
