import React, { ReactElement } from 'react';
import cn from 'classnames';

import styles from './style.module.scss';

export interface IColumn<RecordType, Key extends keyof RecordType> {
    title?: string;
    key: Key;
    width?: string;
    render: (value: any, record: RecordType, index?: number) => string | ReactElement;
}

interface IProps<RecordType> {
    showHeader?: boolean;
    columns: IColumn<RecordType, keyof RecordType>[];
    data?: RecordType[];
    onDoubleClick?: (item: RecordType, index: number) => void;
    isRecordRowDisabled?: (record: RecordType) => boolean;
}

function Table<RecordType extends Record<string, any> = any>({
    showHeader = true,
    columns,
    data,
    onDoubleClick,
    isRecordRowDisabled,
}: IProps<RecordType>) {
    return (
        <div className={styles.root}>
            {showHeader && (
                <div className={styles.header}>
                    {columns.map(({ title, width }, index) => {
                        return (
                            <div key={index} style={{ width }}>
                                {title}
                            </div>
                        );
                    })}
                </div>
            )}
            {data?.length ? (
                <div className={styles.content}>
                    {data?.map((item, index) => {
                        const disabled = isRecordRowDisabled && isRecordRowDisabled(item);

                        return (
                            <div
                                key={index}
                                className={cn(styles.row, disabled && styles.disabled)}
                                onDoubleClick={
                                    disabled
                                        ? () => {}
                                        : () => onDoubleClick && onDoubleClick(item, index)
                                }
                            >
                                {columns.map(({ key, width, render }, idx) => {
                                    return (
                                        <div key={idx} style={{ width }}>
                                            {render(item[key], item, index)}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={styles.empty}>暂无数据喔</div>
            )}
        </div>
    );
}

export default Table;
