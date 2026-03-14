<template>
    <v-layout class="pt-16">
        <v-main class="pt-0">
            <v-sheet class="w-100 d-flex justify-center">
                <v-sheet
                    class="blob position-fixed top-0 mt-n16 rounded-circle"
                    width="150dvw"
                    height="max(120px, 10dvh)"
                ></v-sheet>
            </v-sheet>
            <slot></slot>
        </v-main>
        <v-bottom-navigation 
            grow 
            fixed 
            mode="shift" 
            color="accent"
            class="position-fixed bottom-0 left-0 text-grey-darken-1" 
        >
            <v-btn to="/admin/accounts" value="accounts">
                <v-icon>mdi-account-group</v-icon>
                <span>Accounts</span>
            </v-btn>
            <v-btn to="/admin/thresholds" value="thresholds">
                <v-icon>mdi-tune-vertical</v-icon>
                <span>Threholds</span>
            </v-btn>
            <v-btn to="/admin/analytics" value="analytics">
                <v-icon>mdi-chart-line</v-icon>
                <span>Analytics</span>
            </v-btn>
            <v-btn to="/admin/audit" value="audit">
                <v-icon>mdi-clipboard-text-clock</v-icon>
                <span>Audit</span>
            </v-btn>
        </v-bottom-navigation>
    </v-layout>
</template>

<script setup lang="ts">

</script>

<style scoped>
.v-app-bar, .blob {
    z-index: -1;
    background: #008A17;
    background: linear-gradient(270deg, rgb(var(--v-theme-accent)) 0%, rgb(var(--v-theme-secondary)) 100%);
}
</style>