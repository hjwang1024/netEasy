import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { IBanner } from '@/apis/modules/types/personalized';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './style.module.scss';

import axios from '@/apis';

const Recommendation = () => {
    const [banners, setBanners] = useState<IBanner[]>([]);
    const getBannerList = async () => {
        const res = await axios.getBanner();
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
                speed={1}
                centeredSlides={true}
                loop={true}
                observer={true}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                observeParents={true}
                initialSlide={3}
                className={styles.mySwiper}
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
