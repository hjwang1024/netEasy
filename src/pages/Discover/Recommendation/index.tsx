import React from 'react';
import Swiper from './Swiper';
import styles from './style.module.scss';
import RecommendPlaylist from './RecommendPlaylist';
const Recommendation = () => {
    return (
        <div className={styles.recommendation}>
            <Swiper></Swiper>
            <RecommendPlaylist></RecommendPlaylist>
        </div>
    );
};
export default Recommendation;
