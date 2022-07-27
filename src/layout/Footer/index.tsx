import React from 'react';
import styles from './style.module.scss';
import cn from 'classnames';
import PlayOperations from './PlayOperations';
import AudioTimer from './AudioTimer';
import ProgressBar from './ProgressBar';
import { Icon, Tooltip } from '@blueprintjs/core';
import Artists from '@@/Artists';

const Footer = () => {
    // console.log(styles);
    const musicId = true;
    const showLyric = false;
    const music: any = {};
    const musicInfo: any = {};
    const handleShowLyric = () => {
        console.log('showLyric');
    };
    const handleHideLyric = () => {
        console.log('hideLyric');
    };
    return (
        <div className={styles.homeFooter}>
            {musicId ? (
                <div className={styles.progressBar}>
                    <ProgressBar />
                </div>
            ) : null}

            <div className={styles.songWrap}>
                {!!musicId && (
                    <>
                        <div className={cn(styles.pic, !showLyric && styles.showLyric)}>
                            <img
                                src={music?.picUrl ? `${music?.picUrl}?param=40y40` : undefined}
                                loading='lazy'
                            />
                            {!showLyric && (
                                <div className={styles.mask} onClick={handleShowLyric}>
                                    <Icon icon='double-chevron-up' />
                                </div>
                            )}
                            {showLyric && (
                                <div
                                    className={cn(styles.mask, styles.hideLyric)}
                                    onClick={handleHideLyric}
                                >
                                    <Icon icon='double-chevron-down' />
                                </div>
                            )}
                        </div>
                        <div>
                            <div className={styles.info}>
                                <div className={styles.name}>{`${music?.name || '--'} -`}</div>
                                <Artists artists={musicInfo?.music?.artists} />
                            </div>
                            <div className={styles.time}>
                                <AudioTimer />
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className={styles.operations}>
                <PlayOperations />
            </div>
        </div>
    );
};

export default Footer;
