/* Time Method */

/**
 * 按指定日期格式对日期对象格式化
 *
 * @param   {date}       date    日期对象
 * @param   {string}     format  指定格式化对象，默认值 'YYYY-MM-DD hh:mm:ss'
 * @param   {boolean=}   en      是否输出英文日期，主要影响：星期、午（可选，默认 中文）
 * @return  {string}             返回格式化后的日期字符串
 * @用例    dateFormat(new Date(), 'YYYY年MM月DD日 q季度 星期d N午H点 hh时mm分ss秒S毫秒')
 * @用例    dateFormat(new Date(), 'YYYY-MM-DD Qq d NH hh:mm:ss:S', true)
 */
export function dateFormat(date: Date, format?: string, en?: boolean) {
    if (!date) {
        return '';
    }
    const self = new Date(date);
    let fmt = format || 'YYYY-MM-DD hh:mm:ss';
    let i18n = {
        week: ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d'],
        am: '\u4e0a',
        pm: '\u4e0b',
    };
    if (en) {
        i18n = {
            week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            am: 'AM',
            pm: 'PM',
        };
    }
    const o: any = {
        'M+': self.getMonth() + 1,
        'D+': self.getDate(),
        'h+': self.getHours(),
        'H+': self.getHours() % 12 === 0 ? 12 : self.getHours() % 12,
        N: self.getHours() >= 12 ? i18n.pm : i18n.am,
        'm+': self.getMinutes(),
        's+': self.getSeconds(),
        'q+': Math.floor((self.getMonth() + 3) / 3),
        S: self.getMilliseconds(),
    };
    const isYear = (/(Y+)/.exec(fmt) || [])[1];
    if (isYear) {
        fmt = fmt.replace(isYear, (self.getFullYear() + '').substring(4 - isYear.length));
    }
    for (const k in o) {
        const isDate = (new RegExp('(' + k + ')').exec(fmt) || [])[1];
        if (isDate) {
            const prefix = ('00' + o[k]).substring(('' + o[k]).length);
            fmt = fmt.replace(isDate, isDate.length === 1 ? o[k] : prefix);
        }
    }
    const isWeek = (/(d+)/.exec(fmt) || [])[1];
    if (isWeek) {
        const week = i18n.week[self.getDay()];
        const len = en && isWeek.length > 1 ? 3 : week.length;
        fmt = fmt.replace(isWeek, week.substring(0, len));
    }
    return fmt;
}

// 将时间戳格式转化为字符串格式（针对常用格式的快捷封装）
export function translateDate(time: number | string, formatType = 0) {
    const formatStr = ['YYYY-MM-DD hh:mm', 'YYYY-MM-DD', 'MM-DD hh:mm'][formatType];
    const timer = timestamp(time);
    return dateFormat(timer as any, formatStr);
}

// 将字符串形式（YYYY-MM-DD）转化为时间戳（毫秒值），兼容 Safari
export function dateStr2timestamp(str: string): number | null {
    if (!str || typeof str !== 'string') {
        return null;
    }
    if (!str.includes('T')) {
        str = str.replace(/-/g, '/');
    }
    const timestamp = new Date(str).getTime();
    return timestamp;
}

// 统一处理时间戳（空值兼容处理，秒、毫秒值兼容处理）
export function timestamp(time: any): number | null {
    if (!time) {
        // 兼容 element 时间控件初始值
        return null;
    }
    if (isNumber(time)) {
        const str = String(parseInt(time));
        if (str.length === 10) {
            return time * 1000;
        }
        return time - 0;
    } else {
        return (dateStr2timestamp(time) as any) - 0;
    }
}

// 时间转换，scale为比例，此处默认为秒。
export function timeFormat(time: number, scale = 1) {
    if (!time) {
        return null;
    }
    if (time % (60 * 60 * 24 * scale) === 0) {
        return `${time / (60 * 60 * 24 * scale)} days`;
    } else if (time % (60 * 60 * scale) === 0) {
        return `${time / (60 * 60 * scale)} hours`;
    } else if (time % (60 * scale) === 0) {
        return `${time / (60 * scale)} minutes`;
    } else {
        return `${time / scale} seconds`;
    }
}

/* String Method */

// 根据字节长度截取字符串并附加标记（默认...）
export function shorten(str: string, maxLen: number, token: string): string | undefined {
    if (!str) {
        return;
    }
    const len = str.length;
    let count = 0;
    let i;
    for (i = 0; i < len; i++) {
        if (str[i].match(/[^\x00-\xff]/gi) !== null) {
            count += 2;
        } else {
            count += 1;
        }
        if (count > maxLen) {
            break;
        }
    }
    if (len > i) {
        str = str.substring(0, i) + (token || '...');
    }
    return str;
}

// 首字母大写
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

// 每个词首字母大写
export function camelCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// 下划线转首字母大写
export function snakeToCamel(str: string): string {
    return str
        .split('_')
        .map((item) => {
            return capitalize(item);
        })
        .join(' ');
}

// 数字添加千分位
export function numberFormat(number: number): string {
    if (window.Intl) {
        // 原生API，IE10、Safari9 不支持
        const inf = new Intl.NumberFormat();
        return inf.format(number);
    } else {
        // 正则式
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // 原生API，Safari 不支持
    // return parseFloat(number).toLocaleString();
}

/* Array Method */

// 删除数组中指定项（对于对象数组可以按其一指定属性 key 值来计算）
export function removeFromArr<T>(array: Array<T>, value: T | string, key: string): Array<T> {
    return array.filter((item: any) => {
        const realValue = key ? item[key] : item;
        return realValue !== value;
    });
}

// 获取对象数组中指定属性重新生成新数组
export function flatFromArr<T>(array: Array<T>, key: string): Array<T> {
    return array.map((item: any) => {
        return item[key];
    });
}

// 数组检测重复项（对于对象数组可以按其一项指定属性 key 值来检测）
export function findRepeat<T>(array: any, key: string) {
    const hash: any = {};
    let repeat;
    for (const item of array) {
        const realKey = typeof item[key] + item[key];
        if (hash[realKey] !== 1) {
            hash[realKey] = 1;
        } else {
            repeat = item[key];
            break;
        }
    }
    return repeat;
}

// 数组去重（对于对象数组可以按其一项指定属性 key 值来过滤）
export function unique<T>(array: Array<T>, key: string): Array<T> {
    const result = new Map();
    return array.filter((item: any) => {
        const realValue = key ? item[key] : item;
        return !result.has(realValue) && result.set(realValue, 1);
    });
}

// 数组交集
export function intersection<T>(a: Array<T>, b: Array<T>): Array<T> {
    return a.filter((item) => b.indexOf(item) > -1);
}

// 数组并集
export function union<T>(a: Array<T>, b: Array<T>): Array<T> {
    const orphan = b.filter((item) => a.indexOf(item) < 0);
    return a.concat(orphan);
}

// 数组浅比较
export function isArrayEqual<T>(a: Array<T>, b: Array<T>): boolean {
    if (a === b) {
        return true;
    }
    if (a === null || b === null) {
        return false;
    }
    if (a.length !== b.length) {
        return false;
    }
    const cloneA = a.slice().sort();
    const cloneB = b.slice().sort();

    for (let i = 0; i < cloneA.length; ++i) {
        if (cloneA[i] !== cloneB[i]) {
            return false;
        }
    }
    return true;
}

/* Object Method */

// 是否为 falsey 值，避免误判 0 和 false
export function isNil(value: any): boolean {
    return value === null || value === undefined || value === '';
}

// 是否为数字或者纯数字字符串，避免使用 isNaN 时误判空字符串和 null
export function isNumber(value: any): boolean {
    return !isNaN(value - parseFloat(value));
}

// 是否为正整数
export function isInteger(value: number): boolean {
    return typeof value === 'number' && value % 1 === 0;
}

// 是否为空对象
export function isEmpty(target: any): boolean {
    if (target === null || target === undefined) {
        return true;
    }
    return Object.keys(target).length === 0 && target.constructor === Object;
}

// 获取数据类型
export function getType(target: any): string {
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

/**
 * 安全读取对象深度嵌套的属性，遇到不存在的属性会返回 undefined，避免报错
 *
 * @param   {object}    target  目标对象
 * @param   {string}    path    属性路径，为点语法组成的字符串，支持字面量，可以使用模板字符串支持变量
 * @return  {any}               返回对象的属性值
 * @用例    getProp(obj, 'a.b.c') => obj.a.b.c
 * @用例    getProp(obj, `a.${this.b}.c`) => obj.a[this.b].c
 */
export function getProp<T>(target: T, path: string): any {
    return path.split('.').reduce((obj: any, key: string) => {
        return obj && obj[key];
    }, target);
}

// 获取对象的指定属性重新生成新对象
export function pick<T>(target: any, props: any = []) {
    if (!Array.isArray(props) || !props.length) {
        return target;
    }
    const flag: any = {};
    props.forEach((key: string) => {
        if (target[key] !== undefined) {
            flag[key] = deepClone(target[key]);
        }
    });
    return flag;
}

// 排除对象的指定属性后重新生成新对象
export function omit<T>(target: any, props: Array<string> = []) {
    if (!Array.isArray(props) || !props.length) {
        return target;
    }
    return Object.keys(target).reduce((flag: any, key: string) => {
        if (props.indexOf(key) === -1) {
            flag[key] = deepClone(target[key]);
        }
        return flag;
    }, {});
}

// 深复制（支持基础类型以及对象、数组、函数、日期、正则；支持 Map、Set、Symbol、Error 等类型，支持循环引用）
export function deepClone(target: any, cache = new WeakMap()): any {
    if (cache.get(target)) {
        return cache.get(target);
    }
    if (!target || typeof target !== 'object') {
        return target;
    }
    let clone: any;
    if (Array.isArray(target)) {
        clone = [];
    } else if (typeof target === 'function') {
        clone = function (this: unknown, ...args: any) {
            return target.call(this, args);
        };
    } else if (target instanceof RegExp) {
        clone = new RegExp(target.source, target.flags);
    } else if (target instanceof Date) {
        clone = new Date(target);
    } else if (target instanceof Set) {
        clone = new Set(target);
    } else if (target instanceof Map) {
        clone = new Map(target);
    } else {
        clone = Object.create(Object.getPrototypeOf(target));
    }
    // 将属性和复制后的值作为一个 map
    cache.set(target, clone);
    Object.keys(target).forEach((key) => {
        clone[key] = deepClone(target[key], cache);
    });
    return clone;
}

/* Business Method */

/**
 * 在对象数组中通过指定属性值查找对应对象的其他属性，即 array[id === value].name
 *
 * @param   {array}     array   对象数组
 * @param   {string}    value   指定查询的值
 * @param   {string}    id      用于查询的属性名
 * @param   {string=}   name    返回对象的某一属性值，不指定返回整个对象（可选）
 * @param   {boolean=}  multi   是否多选，用于 id===value 的对象不唯一的情况（可选，默认 false）
 * @return  {any}               返回整个对象或者对象的某一属性
 */
export function getNameById(
    array: Array<any>,
    value: string,
    id: string,
    name: string,
    multi?: boolean,
) {
    const arr = array || [];
    let flag;
    const result = arr.filter((item: any) => {
        return item[id] + '' === value + '';
    });
    if (multi) {
        flag = result.map((item: any) => {
            return item[name];
        });
    } else {
        const obj: any = result[0];
        flag = name ? obj && obj[name] : obj;
    }
    return flag;
}

// Promise reject 处理函数
export function reject(error: any, param: any) {
    const errMsg = error.error_message ? new Error(error.error_message) : new Error(error);
    if (param) {
        param.fallback && param.fallback(errMsg);
    } else {
        return Promise.reject(errMsg);
    }
}

// 防抖函数
export function debounce(fn: any, delay: number) {
    if (delay <= 0) {
        return fn;
    }
    let timer: any;
    return function (this: unknown, ...args: any) {
        const context = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = undefined;
            fn.apply(context, args);
        }, delay);
    };
}

/**
 * 动态导入指定目录的所有 js 模块
 *
 * @param   {function}  files   使用 require.context() 方法导入指定目录的文件后返回的函数（包含3个属性 resolve、keys、id），模块 export 方式可以使用 module（一般用于方法）或者 default（一般用于数据）
 * @param   {array=}    except  指定不需要导入的排除文件（可选，默认 空数组[]）
 * @param   {boolean=}  nested  是否用文件名作为键名，对返回结果多嵌套一层（可选，默认 false）
 * @return  {any}               使用 module 导入或者明确指定 nested 的话，返回对象类型（嵌套时一级键名为文件名；不嵌套时，所有模块内所有变量的名称直接作为一级键名，所以要求不能重名）；使用 default 导入，则整合所有模块的数据为一个数组，直接返回（对顺序有要求的，建议针对每个模块添加 order 属性，辅助排序函数达到目标）
 * @用例    export default importAll(require.context('./', true, /\.js$/), ['./request', './index']);
 */
export function importAll(files: any, except: Array<any> = [], nested?: boolean) {
    let arr: Array<any> = [];
    const map: any = {};
    let fileType;
    files.keys().forEach((key: any) => {
        const invalid = except.some((item) => {
            return key.indexOf(item) > -1;
        });
        if (invalid) {
            return;
        }
        const module = files(key);
        const realModule = module.default || module;
        if (getType(realModule) === 'module' || nested) {
            fileType = 'module';
            if (nested) {
                const keyArr = key.split('/');
                keyArr.shift();
                const realKey = keyArr.join('').replace(/\.js$/g, '');
                map[realKey] = realModule;
            } else {
                Object.keys(realModule).forEach((i) => {
                    map[i] = realModule[i];
                });
            }
        } else {
            arr = arr.concat(realModule);
        }
    });
    if (fileType === 'module') {
        return map;
    }
    return arr;
}

export function readFile(file: File, action: string) {
    const method = action === 'text' ? 'readAsText' : 'readAsArrayBuffer';
    const reader: any = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = (evt: any) => {
            resolve(evt.target.result);
        };
        reader.onerror = (error: any) => {
            reader.abort();
            reject(error);
        };
        reader[method](file);
    });
}

/* Dom Method */

/**
 * 视窗平滑滚动到目标元素的顶部
 *
 * @param   {element}   target  目标元素（Dom 元素）
 * @param   {number}    offset 距离顶部的偏移像素（可选，默认 0）
 * @param   {function}  callback 回调函数（可选）
 * @param   {number}    duration 持续毫秒值（可选，默认 500）
 */
export function animateScroll(target: Element, offset = 0, callback: any, duration = 500) {
    const from = window.pageYOffset;
    const to = Math.floor(target.getBoundingClientRect().top) + from - offset;
    const change = to - from;
    const startTime = Date.now();

    if (change === 0) {
        callback && callback();
        return;
    }
    // 缓动函数
    const easeOutQuint = function (t: number, b: number, c: number, d: number) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };

    const scroll = function () {
        const time = Date.now() - startTime;
        const scrollTop = easeOutQuint(time, from, change, duration);

        window.scrollTo(0, scrollTop);
        if (time < duration) {
            window.requestAnimationFrame(scroll);
        } else {
            window.scrollTo(0, to);
            callback && callback();
        }
    };
    scroll();
}

/* Request Method */

/**
 * 根据 ajax 返回内容或者指定文本生成下载文件
 *
 * @param   {string}            fileName    生成文件的名称
 * @param   {string || blob}    fileContent 接口返回或者生成的文本或二进制内容
 * @param   {string}            fileType    文件类型，诸如 text/csv 等，可以从响应头获取（response.headers['content-type'].split(';').shift()）
 * @return  {file}              会在浏览器端触发下载文件的行为
 */
export function downloadFile(fileName: string, fileContent: any, fileType: string): void {
    let blob;
    let downloadUrl = '';
    if (window.Blob && window.URL && window.URL.createObjectURL != null) {
        blob = new Blob([fileContent], { type: fileType });
        downloadUrl = URL.createObjectURL(blob);
    } else {
        downloadUrl = 'data:' + fileType + ';charset=utf-8,' + encodeURI(fileContent as string);
    }
    const nav = window.navigator as any;
    if (nav && typeof nav.msSaveBlob !== 'undefined') {
        nav.msSaveBlob(blob, fileName);
    } else {
        const link = document.createElement('a');
        if (typeof link.download === 'undefined') {
            if (fileType.indexOf('zip') > -1) {
                downloadUrl = 'data:' + fileType + ';base64,' + fileContent.toString('base64');
            } else {
                downloadUrl =
                    'data:application/file;charset=utf-8,' + encodeURI(fileContent as any);
            }
            (window.location as any) = downloadUrl;
        } else {
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            if (blob) {
                URL.revokeObjectURL(blob as any);
            }
        }
    }
}

export function copyToClipboard(text: string): boolean | void {
    if ((window as any).clipboardData && (window as any).clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return (window as any).clipboardData.setData('Text', text);
    } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        const textarea = document.createElement('textarea');
        textarea.textContent = text;
        textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand('copy'); // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn('Copy to clipboard failed.', ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

// 签名函数
export function getUrl<T>(url: string, param: any) {
    const keys = Object.keys(param).sort();
    const query = keys.reduce((result, key, i) => {
        const str = key + '=' + encodeURI(param[key]);
        return i === 0 ? str : result + '&' + str;
    }, '');
    return url + '?' + query;
}
export function genSignUrl<T>(target: T, signature: string) {
    return [target, 'signature=' + signature].join('&');
}

// 生成 pigat 列表中指定属性的相关数据
export function genPigatList<T>(pigat: T, props: Array<any>, isTotal = false) {
    return props.reduce((result, key) => {
        const current = getProp(pigat, `engine.${key}`) || [];
        const arr: Array<any> = [];
        current.forEach((item: any) => {
            const last = key.split('.').pop();
            const fullName = `pigat.${last}.${item.name}`;
            if (isTotal) {
                arr.push({ ...item, fullName });
            } else {
                arr.push(fullName);
            }
            if (last === 'item') {
                if (Object.prototype.hasOwnProperty.call(item, 'attribute')) {
                    item.attribute.forEach((i: any) => {
                        const name = `${fullName}.${i.name}`;
                        if (isTotal) {
                            arr.push({ ...i, fullName: name });
                        } else {
                            arr.push(name);
                        }
                    });
                }
            }
        });
        return result.concat(arr);
    }, []);
}
