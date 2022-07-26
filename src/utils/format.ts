export const formatNum = (num = 0) => {
    let result = '';

    if (num > Math.pow(10, 8)) {
        result = (num / Math.pow(10, 8)).toFixed(3) + '亿';
    } else if (num > Math.pow(10, 4)) {
        result = Math.round(num / Math.pow(10, 4)) + '万';
    } else {
        return num;
    }

    return result;
};

export const formatTime = (interval?: number) => {
    interval = Math.floor(interval || 0);
    const minute = formatNum(Math.floor(interval / 60));
    const second = formatNum(interval % 60);
    return `${minute}:${second}`;
};

export const formatDatetime = (t?: string | number, detailed?: boolean) => {
    const time = new Date(Number(t) || 0);

    const year = time.getFullYear();
    const month = formatNum(time.getMonth() + 1);
    const date = formatNum(time.getDate());
    const hours = formatNum(time.getHours());
    const minutes = formatNum(time.getMinutes());
    const seconds = formatNum(time.getSeconds());

    return detailed
        ? `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
        : `${year}-${month}-${date}`;
};
