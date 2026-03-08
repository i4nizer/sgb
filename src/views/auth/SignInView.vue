<template>
    <v-container fluid class="fill-height">
        <v-row dense justify="center">
            <v-col cols="12" md="6" lg="4" xl="3" xxl="2">
                <v-card class="bg-primary" elevation="0">
                    <v-card-title>Sign In</v-card-title>
                    <v-card-subtitle>Sign in to Dashboard</v-card-subtitle>
                    <v-card-text class="px-0">
                        <SignInForm @submit="onSubmitSignIn"></SignInForm>
                        <div class="w-100 text-center">
                            <small class="text-grey">Contact admin for an account.</small>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import type { UserSignInSchema } from '@/schemas/UserSchema';
import type { SubmissionContext } from 'vee-validate';
import { useRouter } from 'vue-router';
import SignInForm from '@/components/auth/SignInForm.vue';
import useToast from '@/composables/use-toast';
import { useAuthStore } from '@/stores/auth';

//

// --- Utils
const toastCmp = useToast()
const routerCmp = useRouter()

// --- Stores
const authStore = useAuthStore()

//

const onSubmitSignIn = async (
    values: UserSignInSchema,
    ctx: SubmissionContext<{ [K in keyof UserSignInSchema]?: unknown }>
) => {
    await authStore.signIn(values)
        .then(() => toastCmp.success("User signed-in successfully."))
        .then(async () => await routerCmp.push("/app/home"))
        .catch((e) => toastCmp.error(e?.status == 400 ? "Incorrect credentials provided." : "Something went wrong."))
}

//

</script>

<style scoped>

</style>