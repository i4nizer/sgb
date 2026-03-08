import vuetify from "./vuetify"
import router from "@/router"
import pinia from "./pinia"
import "./chartjs"
import type { App } from "vue"

//

const registerPlugins = (app: App) => {
	app.use(vuetify)
	app.use(router)
	app.use(pinia)
}

//

export default { registerPlugins }
