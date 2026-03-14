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
		<v-select
			class="w-75"
			label="Role"
			v-model="role"
            :items="UserRole"
			:disabled="isSubmitting || disabled"
			:error-messages="roleError"
		></v-select>
		<v-text-field
			type="email"
			class="w-75"
			label="Email"
			v-model="email"
			:disabled="isSubmitting || disabled"
			:error-messages="emailError"
		></v-text-field>
		<v-text-field
			class="w-75"
			label="Phone"
			v-model="phone"
			:disabled="isSubmitting || disabled"
			:error-messages="phoneError"
		></v-text-field>
		<v-text-field
			class="w-75"
			label="Password"
			v-model="password"
			:type="showPasswordType"
			:disabled="isSubmitting || disabled"
			:error-messages="passwordError"
			:append-inner-icon="showPasswordIcon"
			@click:append-inner="showPassword = !showPassword"
		></v-text-field>
		<v-btn 
            text="Create"
			type="submit" 
			color="accent" 
			class="w-75 my-2" 
			:disabled
			:loading="isSubmitting"
		></v-btn>
	</v-form>
</template>

<script setup lang="ts">
import { UserCreateSchema, UserRole } from "@/schemas/UserSchema"
import { toTypedSchema } from "@vee-validate/zod"
import { useField, useForm, type SubmissionContext } from "vee-validate"
import { computed, ref } from "vue"

//

const props = defineProps<{
	disabled?: boolean
	onError?: (error: any) => any
	onSubmit?: (values: UserCreateSchema, ctx: SubmissionContext<{ [K in keyof UserCreateSchema]?: unknown }>) => any
}>()

//

const { handleSubmit, isSubmitting } = useForm({ validationSchema: toTypedSchema(UserCreateSchema) })

const { value: name, errorMessage: nameError } = useField<string>("name")
const { value: role, errorMessage: roleError } = useField<UserRole>("role")
const { value: email, errorMessage: emailError } = useField<string>("email")
const { value: phone, errorMessage: phoneError } = useField<string>("phone")
const { value: password, errorMessage: passwordError } = useField<string>("password")

const showPassword = ref(false)
const showPasswordType = computed(() => (showPassword.value ? "text" : "password"))
const showPasswordIcon = computed(() => (showPassword.value ? "mdi-eye-off" : "mdi-eye"))

//

const onSubmit = handleSubmit(async (values, ctx) => {
	await Promise.resolve()
		.then(() => props.onSubmit && props.onSubmit(values, ctx))
		.catch(err => props.onError && props.onError(err))
})

//
</script>

<style scoped></style>
