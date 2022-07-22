import { importAll } from '../utils/util';

export const files = require.context('./modules/', false, /\.ts$/);
export default importAll(files, []);
