import { registerPlugins } from "@/plugins"
import App from "./App.vue"
import { createApp } from "vue"
import "unfonts.css"
import "@fontsource/dm-sans"
import "@fontsource/dm-sans/400.css"
import "@fontsource/dm-sans/500.css"
import "@fontsource/dm-sans/600.css"
import "@fontsource/dm-sans/700.css"

//

const app = createApp(App)
registerPlugins(app)
app.mount("#app")
