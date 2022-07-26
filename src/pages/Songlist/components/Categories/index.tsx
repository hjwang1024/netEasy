import React from 'react';
import { Icon } from '@blueprintjs/core';
import cn from 'classnames';
import { Popover } from 'antd';
import { IGetSonglistCatsResponse, ICategory } from '@/apis/modules/types/songlist';
import styles from './style.module.scss';

interface IProps {
    cats?: IGetSonglistCatsResponse;
    hotCats?: ICategory[];
    selectedCat?: string;
    onCatSelect: (cat: string) => void;
}

const { useState } = React;

export const DEFAULT_CAT = '全部';

const Categories: React.FC<IProps> = ({ cats, hotCats, selectedCat, onCatSelect }) => {
    const [currentCat, setCurrentCat] = useState(selectedCat || DEFAULT_CAT);

    const handleCatClick = (cat: string) => {
        setCurrentCat(cat);

        onCatSelect(cat);
    };

    const renderCats = () => {
        return (
            <div className={styles.popover}>
                <div className={styles.all}>
                    <span
                        className={currentCat === DEFAULT_CAT ? styles.active : ''}
                        onClick={() => handleCatClick(DEFAULT_CAT)}
                    >
                        全部歌单
                    </span>
                </div>
                <div className={styles.content}>
                    {Object.entries(cats?.categories || {}).map(([key, value]) => {
                        const subCats = cats?.sub.filter(
                            ({ category }) => category === Number(key),
                        );
                        return (
                            <div className={styles.catBlock} key={key}>
                                <div className={styles.label}>{value}</div>
                                <div className={styles.content}>
                                    {subCats?.map(({ name }) => {
                                        return (
                                            <div
                                                key={name}
                                                className={cn(
                                                    styles.tag,
                                                    currentCat === name && styles.active,
                                                )}
                                                onClick={() => handleCatClick(name)}
                                            >
                                                {name}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.root}>
            <div className={styles.cats}>
                <Popover content={renderCats()} placement='right' trigger='click'>
                    <div className={styles.catsBtn}>
                        {currentCat}
                        <Icon icon='chevron-right' />
                    </div>
                </Popover>
            </div>
            <div className={styles.hotCats}>
                {hotCats?.map(({ name }) => {
                    return (
                        <div
                            key={name}
                            className={cn(styles.tag, currentCat === name && styles.active)}
                            onClick={() => handleCatClick(name)}
                        >
                            {name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Categories;
