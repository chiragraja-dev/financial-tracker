import { AxiosRequestConfig } from 'axios';
import Axios, { AxiosObservable } from 'axios-observable';

const axiosInstance = Axios.create({});

// response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return Promise.resolve(response);
    },
    (error) => {
        if (error?.response?.status === 401) {
            window.location.href = '/login';
            localStorage.removeItem("practitionerID")
        }

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(
    (config: any) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return Promise.resolve(config);
    },
    (error) => {
        return Promise.reject(error);
    }
);

function get<T>(
    url: string,
    params?: AxiosRequestConfig<any>
): AxiosObservable<T> {
    return axiosInstance.get(url, params);
}

function post<T>(
    url: string,
    body?: any,
    params?: AxiosRequestConfig<any>
): AxiosObservable<T> {
    return axiosInstance.post(url, body, params);
}

function put<T>(
    url: string,
    body?: any,
    params?: AxiosRequestConfig<any>
): AxiosObservable<T> {
    return axiosInstance.put(url, body, params);
}

function del<T>(
    url: string,
    params?: AxiosRequestConfig<any>
): AxiosObservable<T> {
    return axiosInstance.delete(url, params);
}

function patch<T>(
    url: string,
    body?: any,
    params?: AxiosRequestConfig<any>
): AxiosObservable<T> {
    return axiosInstance.patch(url, body, params);
}

export default {
    get,
    post,
    patch,
    put,
    del,
};
