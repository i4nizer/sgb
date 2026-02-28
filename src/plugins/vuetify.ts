import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"
import { createVuetify } from "vuetify"
import { VDateInput } from "vuetify/labs/VDateInput"
import { VFileUpload } from "vuetify/labs/VFileUpload"

//

export default createVuetify({
	theme: {
		defaultTheme: "light",
		themes: {
			light: {
				dark: false,
				colors: {
					accent: "#4a8c6f",
					primary: "#f9faf9",
					secondary: "#e4ece8",
				},
			},
			dark: {
				dark: true,
				colors: {
					accent: "#5aab87",
					primary: "#181a19",
					secondary: "#252a27",
				},
			},
		},
	},
	components: { VDateInput, VFileUpload },
	defaults: {
		VBtn: {
			class: "text-none",
			elevation: 0,
		},
		VTextField: {
			variant: "outlined",
			density: "compact",
			class: "mt-1",
		},
		VNumberInput: {
			variant: "outlined",
			density: "compact",
			class: "mt-1",
		},
		VSelect: {
			variant: "outlined",
			density: "compact",
			class: "mt-1",
		},
		VTextarea: {
			variant: "outlined",
			density: "compact",
			class: "mt-1",
		},
		VDateInput: {
			variant: "outlined",
			density: "compact",
			class: "mt-1",
		},
	},
})
