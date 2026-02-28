<template>
    <v-container class="">
        <v-row dense>
            <v-col cols="12">
                <v-card>
                    <v-card-text>
                        <div class="w-100 d-flex align-center justify-space-between">
                            <div class="font-weight-bold">Dark Mode</div>
                            <v-spacer></v-spacer>
                            <v-switch
                                inset
                                hide-details
                                color="accent"
                                @update:model-value="onChangeTheme"
                            ></v-switch>
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
    const value = !!v ? "dark" : "light"
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