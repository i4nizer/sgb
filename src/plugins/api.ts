import axios from "axios";
import type { App } from "vue";

//

// --- Instance
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: true })

// --- App Plugin
const install = (app: App) => {
    app.config.globalProperties.$api = api
    app.provide("api", api)
}

//

export { api }
export default { install }
