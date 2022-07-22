import axios, {
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig,
    ResponseType,
    AxiosInstance,
} from 'axios';
import { message as Toast } from 'antd';

const LOCAL_ORIGIN = 'http://106.15.196.84';

export const PORT = 4000;
const TIMEOUT = 40000;

export const SERVER = `${LOCAL_ORIGIN}:${PORT}`;

interface IDictionary<T> {
    [key: string]: T;
}
const MIME_TYPE: IDictionary<ResponseType> = {
    JSON: 'json',
};

const createInstance = () => {
    const instance = axios.create({
        baseURL: SERVER,
        withCredentials: true,
        timeout: TIMEOUT,
        responseType: MIME_TYPE.JSON,
    });

    instance.interceptors.response.use(handleResponse, handleError);

    return instance;
};

const handleResponse = (res: AxiosResponse) => {
    if (res.status === 200) {
        const code = res.data.code;
        if (code === 200) {
            return Promise.resolve(res.data);
        }
    }
    return Promise.reject(res.data);
};

const handleError = (error: AxiosError) => {
    console.log(error);

    const { response, message } = error;
    return Promise.reject(
        response ? new Error((response.data && response.data.message) || message) : error,
    );
};

const toastError = (error: AxiosError) => {
    const { response, message } = error;
    console.error(error);
    Toast.error(response?.data?.message || message);
    return Promise.reject(error);
};

interface Instance extends AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
}
export const requestWithoutErrorToast: Instance = createInstance();

const request: Instance = createInstance();
request.interceptors.response.use(undefined, toastError);

export default request;
