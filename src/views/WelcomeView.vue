<template>
    <v-container fluid class="pt-16 h-100">
        <v-row dense class="pt-16" justify="center">
            <v-col cols="12" sm="6" class="d-flex flex-column align-center">
                <h1 class="text-white font-weight-bold">WELCOME!</h1>
                <v-sheet
                    color="primary"
                    class="pa-5 mt-8"
                    style="z-index: 999;"
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
            </v-col>
        </v-row>
        <v-sheet 
            color="transparent"
            class="d-flex justify-center position-absolute left-0 bottom-0 mb-16"
            width="100%" 
        >
            <v-btn
                to="/auth/sign-in"
                size="large"
                text="Get Started"
                class="w-75 w-md-50 w-lg-33 w-xl-25 bg-accent font-weight-bold"
                style="z-index: 999;"
                elevation="1"
                append-icon="mdi-chevron-right"
            ></v-btn>
        </v-sheet>
        <ParticleDot
            v-for="particle in particles"
            style="z-index: 0;"
            :x="particle.x"
            :y="particle.y"
            :id="particle.id"
            :key="particle.id"
            :color="'white'"
            :delay="particle.delay"
            :duration="particle.duration"
        ></ParticleDot>
    </v-container>
</template>

<script setup lang="ts">
import ParticleDot from "@/components/ParticleDot.vue"

//

// --- Particles
const particles = Array
	.from({ length: 25 })
	.map((_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, delay: i * 0.1 }))
	.map(p => ({ ...p, duration: Math.random() * 4 + 3 }))

//

</script>

<style scoped>
.v-container {
    background: #008A17;
    background: linear-gradient(0deg, rgb(var(--v-theme-accent)) 0%, rgb(var(--v-theme-secondary)) 100%);
}
</style>