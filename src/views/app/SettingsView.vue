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
                                v-model="themeFlag"
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
import { ref } from 'vue';
import { useTheme } from 'vuetify';

//

// --- Theme
const theme = useTheme()
const themeFlag = ref(localStorage.getItem("theme") == "dark")

const onChangeTheme = (v: unknown) => {
    const value = !!v ? "dark" : "light"
    theme.change(value)
    localStorage.setItem("theme", value)
}

//

</script>

<style scoped>

</style>