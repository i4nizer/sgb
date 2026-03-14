<template>
	<v-form 
        class="d-flex flex-column align-center" 
        @submit.prevent="onSubmit"
    >
		<v-text-field
			class="w-75"
			label="Name"
			v-model="name"
			:disabled="isSubmitting || disabled"
			:error-messages="nameError"
		></v-text-field>
		<v-btn 
            text="Delete"
			type="submit" 
			color="orange" 
			class="w-75 my-2 text-white" 
			:disabled
			:loading="isSubmitting"
		></v-btn>
	</v-form>
</template>

<script setup lang="ts">
import { UserDeleteSchema } from "@/schemas/UserSchema"
import { toTypedSchema } from "@vee-validate/zod"
import { useField, useForm, type SubmissionContext } from "vee-validate"

//

const props = defineProps<{
	user: UserDeleteSchema
	disabled?: boolean
	onError?: (error: any) => any
	onSubmit?: (values: UserDeleteSchema, ctx: SubmissionContext<{ [K in keyof UserDeleteSchema]?: unknown }>) => any
}>()

//

const ConfirmSchema = UserDeleteSchema.refine(
	({ name }) => name == props.user.name,
	{ path: ["name"], message: `Match user name "${props.user.name}".` }
)

const { handleSubmit, isSubmitting } = useForm({ validationSchema: toTypedSchema(ConfirmSchema) })
const { value: name, errorMessage: nameError } = useField<string>("name")

//

const onSubmit = handleSubmit(async (values, ctx) => {
	await Promise.resolve()
		.then(() => props.onSubmit && props.onSubmit(values, ctx))
		.catch(err => props.onError && props.onError(err))
})

//
</script>

<style scoped></style>
