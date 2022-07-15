import { importAll } from '../utils/util';

export const files = require.context('./modules/', false, /\.js$/);
export default importAll(files, []);
