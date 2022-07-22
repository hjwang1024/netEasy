import React from 'react';
import { Icon } from '@blueprintjs/core';
import cn from 'classnames';

import { formatNum } from '~/format';
import styles from './style.module.scss';

interface IProps {
    count: number;
    className?: string;
}

const PlayCount: React.FC<IProps> = ({ count, className }) => {
    return (
        <div className={cn(styles.root, className)}>
            <Icon icon='play' />
            {formatNum(count)}
        </div>
    );
};

export default PlayCount;
