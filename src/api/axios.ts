import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { API_URL } from "@/config/api";

const axiosService: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000
})

const request = (config: AxiosRequestConfig, raw = false): Promise<any> => {
    return axiosService
        .request(config)
        .then(response => {
            return raw ? response : response.data;
        })
        .catch(error => {
            if (error.response) {
                const { data, status, headers } = error.response;

                return raw ? { error: "response", data, status, headers } : data;
            } else if (error.request) {
                return raw
                    ? { error: "no_response", data: error.request }
                    : error.request;
            } else {
                return raw
                    ? { error: "custom", message: error.message }
                    : error.message;
            }
        });
}

export { axiosService, request };