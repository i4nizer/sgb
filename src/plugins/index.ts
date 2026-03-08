import vuetify from "./vuetify"
import router from "@/router"
import pinia from "./pinia"
import type { App } from "vue"
import "chart.js/auto"

//

const registerPlugins = (app: App) => {
	app.use(vuetify)
	app.use(router)
	app.use(pinia)
}

//

export default { registerPlugins }
