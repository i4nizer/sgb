<template>
    <v-container fluid class="pt-16 h-100">
        <v-row dense class="pt-16">
            <v-col cols="12" sm="6" class="d-flex flex-column align-center">
                <h1 class="text-white font-weight-bold">WELCOME!</h1>
                <v-sheet
                    color="primary"
                    class="pa-5 mt-8"
                    rounded="circle"
                >
                    <v-icon
                        icon="mdi-leaf"
                        size="64"
                        color="accent"
                    ></v-icon>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col cols="12" class="d-flex justify-center">
                <v-sheet 
                    color="transparent"
                    class="d-flex justify-center position-absolute bottom-0 mb-16"
                    width="80vw" 
                >
                    <v-btn
                        to="/auth/sign-in"
                        size="large"
                        text="Get Started"
                        class="w-100 text-accent font-weight-bold"
                        elevation="1"
                        append-icon="mdi-chevron-right"
                    ></v-btn>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>
.v-container {
    background: #008A17;
    background: linear-gradient(0deg, rgb(var(--v-theme-accent)) 0%, rgb(var(--v-theme-secondary)) 100%);
}
</style>