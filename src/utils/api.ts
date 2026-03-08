import type { AxiosInterceptorRejected } from "node_modules/axios/index.d.cts";
import router from "../router";
import axios from "axios";
import useToast from "@/composables/use-toast";

//

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: true })

//

const onRejected: AxiosInterceptorRejected = async (err) => {
    if (err?.response?.status != 401) return Promise.reject(err)
    const toastCmp = useToast()
    toastCmp.error("Session expired, kindly login again.")
    return await router.push("/auth/sign-in")
}

api.interceptors.response.use((res) => res, onRejected)

//

export default api
