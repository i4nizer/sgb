<template>
    <v-container fluid class="fill-height">
        <v-row>
            <v-col cols="12" md="6" lg="4" xl="3" xxl="2">
                <v-card>
                    <v-card-title>Sign In</v-card-title>
                    <v-card-subtitle>Sign in to Dashboard</v-card-subtitle>
                    <v-card-text class="px-0">
                        <SignInForm
                            @submit="onSubmitSignIn"
                        ></SignInForm>
                        <router-link to="/auth/sign-up" class="mt-5 text-decoration-none text-black">
                        <div class="w-100 text-center">
                            <small class="text-grey">Don't have an account?&nbsp;</small>
                            <small class="text-accent">Sign Up</small>
                        </div>
                    </router-link>
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

//

// --- Global Utilities
const router = useRouter()

//

const onSubmitSignIn = async (
    values: UserSignInSchema,
    ctx: SubmissionContext<{ [K in keyof UserSignInSchema]?: unknown }>
) => {
    await router.push("/app/home")
}

//

</script>

<style scoped>

</style>