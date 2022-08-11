import React, {
    FC,
    useRef,
    useState,
    ReactElement,
    BaseSyntheticEvent,
    useCallback,
    useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './style.module.scss';
import cn from 'classnames';
import PlayOperations from './PlayOperations';
import { formatSongUrl } from '@/utils/play';

import AudioTimer from './AudioTimer';
import ProgressBar from './ProgressBar';
import { Icon, Tooltip } from '@blueprintjs/core';
import Artists from '@@/Artists';
import { IStoreState } from '@/store';
import { actions } from '@@/Player/store';
const Footer: FC = (): ReactElement => {
    const { fullScreen, playingStatus, currentIndex, currentSong, showPlayList, playList } =
        useSelector((state: IStoreState) => ({
            fullScreen: state.player.fullScreen,
            playingStatus: state.player.playingStatus,
            currentIndex: state.player.currentIndex,
            currentSong: state.player.currentSong,
            showPlayList: state.player.showPlayList,
            playList: state.player.playList,
        }));

    // useSelector((state: IStoreState) => {
    //     console.log(state);
    // });
    const dispatch = useDispatch();

    const {
        changeFullScreenAction,
        changePlayingStatusAction,
        changeShowPlayListAction,
        changeCurrentIndexAction,
        changeCurrentSongAction,
        deleteSongAction,
    } = actions;

    const [preSongId, setPreSongId] = useState<number>(),
        [currentTime, setCurrentTime] = useState<number>(0),
        [duration, setDuration] = useState<number>(0),
        [currentPlayingLyric, setPlayingLyric] = useState<string>('');
    const musicId = currentSong?.id;

    const showLyric = false;

    // const percent: number = isNaN(currentTime / duration) ? 0 : currentTime / duration;

    const audioRef = useRef<HTMLAudioElement | null>(null),
        currentLineNum = useRef<number>(0);
    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            console.log('beforeunload');

            togglePlayingState(false);
        });
    }, []);

    useEffect((): void => {
        if (
            !playList ||
            !playList.length ||
            !playList[currentIndex] ||
            currentIndex === -1 ||
            playList[currentIndex].id === preSongId
        )
            return;

        const audioDom = audioRef.current;
        const curSong = playList[currentIndex];

        dispatch(changeCurrentSongAction(curSong));
        setPreSongId(curSong.id);
        audioDom!.src = formatSongUrl(curSong.id);
        // playingStatus && togglePlayingState(true);
        // getLyric(curSong.id);
        setCurrentTime(0);
        setDuration(curSong.dt || 0);
        console.log(curSong.dt);
    }, [currentIndex, playList]);

    useEffect((): void => {
        const audioDom = audioRef.current;
        playingStatus ? audioDom!.play() : audioDom!.pause();
    }, [playingStatus, currentIndex]);

    const handleShowLyric = () => {
        console.log('showLyric');
    };
    const handleHideLyric = () => {
        console.log('hideLyric');
    };

    /**
     * 更新当前时间
     * @param {Event} e
     */
    const handleUpdateTime = (e: BaseSyntheticEvent): void => {
        setCurrentTime(e.target.currentTime);
    };

    /**
     * 当前歌曲播放完成后的处理函数
     */
    const handlePlayEnd = (): void => {
        onClickNext();
    };

    /**
     * 暂停/播放歌曲
     */
    const togglePlayingState = useCallback(
        (state: boolean): void => {
            dispatch(changePlayingStatusAction(state));
            // if (currentLyric.current) {
            //     currentLyric.current.togglePlay(currentTime * 1000);
            // }
        },
        [currentTime],
    );
    /**
     * 切换上一首
     */
    const onClickPrev = useCallback((): void => {
        let index: number = currentIndex - 1;
        if (index < 0) {
            index = playList.length - 1;
        }
        changeCurrentIndex(index);
    }, [currentIndex]);

    /**
     * 切换下一首
     */
    const onClickNext = useCallback((): void => {
        let index: number = currentIndex + 1;
        if (index === playList.length) {
            index = 0;
        }
        changeCurrentIndex(index);
    }, [currentIndex]);

    /**
     * 切换歌曲
     * @param index
     */
    const changeCurrentIndex = (index: number): void => {
        if (index === currentIndex) return;
        dispatch(changeCurrentIndexAction(index));
    };

    return (
        <div className={styles.homeFooter}>
            {/* <button onClick={onClickNext}>123</button> */}
            {/* 进度条 */}
            {musicId ? <div className={styles.progressBar}>{/* <ProgressBar /> */}</div> : null}

            <div className={styles.songWrap}>
                {!!musicId && (
                    <>
                        <div className={cn(styles.pic, !showLyric && styles.showLyric)}>
                            <img
                                src={
                                    currentSong?.album?.picUrl
                                        ? `${currentSong?.album?.picUrl}?param=40y40`
                                        : undefined
                                }
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
                                <div className={styles.name}>{`${
                                    currentSong?.name || '--'
                                } -`}</div>
                                <Artists artists={currentSong?.singers} />
                            </div>
                            <div className={styles.time}>
                                <AudioTimer currentTime={currentTime} duration={duration} />
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* 操作区 */}
            <div className={styles.operations}>
                <PlayOperations
                    playingStatus={playingStatus}
                    playPrev={onClickPrev}
                    playNext={onClickNext}
                    togglePlayingState={togglePlayingState}
                />
            </div>

            {/* H5音频播放器元素 */}
            <audio
                ref={audioRef}
                // autoPlay={true}
                onTimeUpdate={handleUpdateTime}
                onEnded={handlePlayEnd}
            />
        </div>
    );
};

export default Footer;
