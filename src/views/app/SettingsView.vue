<template>
    <v-container class="">
        <v-row dense>
            <v-col cols="12">
                <v-card>
                    <v-card-text>
                        <div class="w-100 d-flex align-center justify-space-between">
                            <div class="font-weight-bold">Theme</div>
                            <v-spacer></v-spacer>
                            <v-radio-group 
                                inline 
                                hide-details
                                class="w-0 d-flex justify-end"
                                v-model="themeType"
                                @update:model-value="onChangeTheme"
                            >
                                <v-radio label="Light" value="light"></v-radio>
                                <v-radio label="Dark" value="dark"></v-radio>
                                <v-radio label="System" value="system"></v-radio>
                            </v-radio-group>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTheme } from 'vuetify';

//

// --- Theme
const theme = useTheme()
const themeType = ref("light")

const onChangeTheme = (v: unknown) => {
    const value = v as string
    theme.change(value)
    localStorage.setItem("theme", value)
}

//

const onMountedCallback = async () => {
    const savedTheme = localStorage.getItem("theme") ?? "system"
    theme.change(savedTheme)
    themeType.value = savedTheme
}

onMounted(onMountedCallback)

//

</script>

<style scoped>

</style>