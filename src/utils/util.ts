/**
 * 动态导入指定目录的所有 ts 模块
 *
 * @param   {function}  files   使用 require.context() 方法导入指定目录的文件后返回的函数（包含3个属性 resolve、keys、id），模块 export 方式可以使用 module（一般用于方法）或者 default（一般用于数据）
 * @param   {array=}    except  指定不需要导入的排除文件（可选，默认 空数组[]）
 * @param   {boolean=}  nested  是否用文件名作为键名，对返回结果多嵌套一层（可选，默认 false）
 * @return  {any}               使用 module 导入或者明确指定 nested 的话，返回对象类型（嵌套时一级键名为文件名；不嵌套时，所有模块内所有变量的名称直接作为一级键名，所以要求不能重名）；使用 default 导入，则整合所有模块的数据为一个数组，直接返回（对顺序有要求的，建议针对每个模块添加 order 属性，辅助排序函数达到目标）
 * @用例    export default importAll(require.context('./', true, /\.ts$/), ['./request', './index']);
 */
export function importAll(files: any, except: any = [], nested?: Boolean) {
    let arr: Array<any> = [];
    let map: any = {};
    let fileType;
    files.keys().forEach((key: any) => {
        let invalid = except.some((item: any) => {
            return key.indexOf(item) > -1;
        });
        if (invalid) {
            return;
        }
        let module = files(key);
        let realModule = module.default || module;
        if (getType(realModule) === 'module' || nested) {
            fileType = 'module';
            if (nested) {
                let keyArr = key.split('/');
                keyArr.shift();
                let realKey = keyArr.join('').replace(/\.ts$/g, '');
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
// 获取数据类型
export function getType(target: any) {
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}
