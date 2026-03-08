import App from "./App.vue"
import plugins from "@/plugins"
import { createApp } from "vue"
import "unfonts.css"
import "@fontsource/dm-sans"
import "@fontsource/dm-sans/400.css"
import "@fontsource/dm-sans/500.css"
import "@fontsource/dm-sans/600.css"
import "@fontsource/dm-sans/700.css"

//

const app = createApp(App)
plugins.registerPlugins(app)
app.mount("#app")
