import axios, { AxiosInstance } from "axios";
import { API_URL } from "@/config/api";

const axiosService: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000
})

export { axiosService };