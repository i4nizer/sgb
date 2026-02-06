<template>
    <v-layout>
        <v-app-bar
            flat
            color="green-darken-4"
            class="px-5"
            elevation="6"
        >
            <v-avatar size="36" class="mr-2">
                <v-img src="/coffee.jpg" />
            </v-avatar>
            <v-app-bar-title>
                <div class="d-flex flex-column ga-0">
                    <span>Smart Germination Box</span>
                    <small class="text-grey text-subtitle-2">IoT Coffee Nursery</small>
                </div>
            </v-app-bar-title>
        </v-app-bar>
        <v-main>
            <slot></slot>
        </v-main>
        <v-bottom-navigation 
            grow 
            fixed 
            mode="shift" 
            class="bg-white position-fixed bottom-0 left-0" 
        >
            <v-btn to="/app/home" value="home">
                <v-icon>mdi-home</v-icon>
                <span>Home</span>
            </v-btn>
            <v-btn to="/app/monitor" value="monitor">
                <v-icon>mdi-chart-bar</v-icon>
                <span>Monitor</span>
            </v-btn>
            <v-btn to="/app/scan" value="scan">
                <v-icon>mdi-camera</v-icon>
                <span>Scan</span>
            </v-btn>
            <v-btn to="/app/growth" value="growth">
                <v-icon>mdi-sprout</v-icon>
                <span>Growth</span>
            </v-btn>
        </v-bottom-navigation>
    </v-layout>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>