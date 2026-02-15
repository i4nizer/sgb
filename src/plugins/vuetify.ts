/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"

// Composables
import { createVuetify } from "vuetify"
import { VDateInput } from "vuetify/labs/VDateInput"
import { VFileUpload } from "vuetify/labs/VFileUpload"

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
	theme: { defaultTheme: "system" },
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
