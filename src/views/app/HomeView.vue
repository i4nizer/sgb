<template>
    <v-container class="">
        <v-row dense>
            <v-col cols="12">
                <Transition>
                    <v-card v-if="showWelcomeNotif" color="green" elevation="1">
                        <template #prepend>
                            <v-icon>mdi-pulse</v-icon>
                        </template>
                        <template #title>
                            <span>Welcome Back!</span>
                        </template>
                        <template #subtitle>
                            <span>All systems working smoothly</span>
                        </template>
                    </v-card>
                </Transition>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
                <ReadingCard
                    icon="mdi-thermometer"
                    unit="C"
                    title="Temperature"
                    status="Optimal"
                    icon:color="red"
                    status:color="green"
                    :value="26.5"
                ></ReadingCard>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
                <ReadingCard
                    icon="mdi-water-outline"
                    unit="%"
                    title="Humidity"
                    status="Good"
                    icon:color="blue"
                    status:color="green"
                    :value="26.5"
                ></ReadingCard>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
                <ReadingCard
                    icon="mdi-sprout-outline"
                    unit="%"
                    title="Soil Moisture"
                    status="Normal"
                    icon:color="green"
                    status:color="green"
                    :value="58"
                ></ReadingCard>
            </v-col>
            <v-col cols="12" sm="6" lg="4">
                <ReadingCard
                    icon="mdi-information-outline"
                    unit="%"
                    title="Alerts"
                    status="Review"
                    icon:color="orange"
                    status:color="orange"
                    :value="2"
                ></ReadingCard>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import ReadingCard from '@/components/app/home/ReadingCard.vue';
import { onMounted, ref } from 'vue';

//

const showWelcomeNotif = ref(false)
setTimeout(() => showWelcomeNotif.value = false, 4000)

onMounted(() => showWelcomeNotif.value = true)

//

</script>

<style scoped>
.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 1s ease-in-out;
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
}
</style>