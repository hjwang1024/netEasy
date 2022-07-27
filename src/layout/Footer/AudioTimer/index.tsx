import React from 'react';

// import { AudioContext } from 'reducers/playMusic';
import { formatTime } from '~/format';

const { useContext, useMemo } = React;

const AudioTimer = () => {
    // const audioInfo = useContext(AudioContext);
    // const { state } = audioInfo;
    const state: any = {};

    const time = useMemo(() => {
        return `${formatTime(state?.time)} / ${formatTime(state?.duration)}`;
    }, [state?.time, state?.duration]);

    return <div>{time}</div>;
};

export default AudioTimer;
