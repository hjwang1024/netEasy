import React from 'react';
import { Icon } from '@blueprintjs/core';

// import {
//     PlayMusicStateContext,
//     PlayMusicDispatchContext,
//     AudioContext,
//     ACTIONS,
// } from 'reducers/playMusic';
import { playList as playListLocalStorage } from '~/play';
import styles from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';

const { useContext, useMemo, useCallback } = React;
interface IPlayerProps {
    playingStatus: boolean;
    playPrev: () => void;
    playNext: () => void;
    togglePlayingState: (state: boolean) => void;
}

const PlayOperations: React.FC<IPlayerProps> = ({
    playingStatus = true,
    playPrev,
    playNext,
    togglePlayingState,
}) => {
    return (
        <>
            <div className={styles.prev} onClick={playPrev}>
                <Icon icon='step-backward' />
            </div>
            <div className={styles.pause} onClick={() => togglePlayingState(!playingStatus)}>
                <Icon icon={playingStatus ? 'pause' : 'play'} />
            </div>
            <div className={styles.next} onClick={playNext}>
                <Icon icon='step-forward' />
            </div>
        </>
    );
};

export default PlayOperations;
