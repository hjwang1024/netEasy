import React from 'react';

// import { AudioContext } from 'reducers/playMusic';
import { formatTime } from '~/format';

const { useContext, useMemo } = React;
interface IProps {
    currentTime: number;
    duration: number;
}
const AudioTimer: React.FC<IProps> = ({ currentTime, duration }) => {
    const time = useMemo(() => {
        return `${formatTime(currentTime)} / ${formatTime(duration)}`;
    }, [currentTime, duration]);

    return <div>{time}</div>;
};

export default AudioTimer;
