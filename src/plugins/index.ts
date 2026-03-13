import vuetify from "./vuetify"
import router from "@/router"
import pinia from "./pinia"
import api from "./api"
import type { App } from "vue"
import "chart.js/auto"

//

const registerPlugins = (app: App) => {
	app.use(vuetify)
	app.use(router)
	app.use(pinia)
	app.use(api)
}

//

export default { registerPlugins }
