<template>
    <div style="z-index: 9999; width: min(80dvw, 350px)">
        <Transition>
            <div
                v-if="queued"
                style="z-index: 99999; width: min(80dvw, 350px)"
                :key="queued.id"
                :class="`
                    px-4 py-2 rounded elevation-1 bg-white text-${queued.color}
                    d-flex align-center justify-space-between
                    ${msgClass || `position-fixed right-0 mr-1 mt-16`}
                `"
            >
                <slot name="text">
                    <span>{{ queued.text }}</span>
                </slot>
                <slot v-if="closable" name="close">
                    <v-icon 
                        size="x-small"
                        icon="mdi-close" 
                        class="bg-transparent"
                        @click="queued = undefined"
                    ></v-icon>
                </slot>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';

//

type Message = { id: number; text: string; color: string }

//

const props = defineProps<{ msgClass?: string, timeout?: number, closable?: boolean }>()
const messages = defineModel<Message[]>({ default: () => [] })

const queued = ref<(Message & { birth: number }) | undefined>()
let interval: ReturnType<typeof setInterval> | undefined = undefined

//

const onIntervalTick = () => {
    if (!queued.value && !messages.value) return
    
    const timeout = props.timeout ?? 5000
    const isTimeout = !queued.value || Date.now() - queued.value.birth > timeout
    if (!isTimeout) return

    const msg = messages.value.shift()
    if (!msg) return queued.value = undefined
    queued.value = { ...msg, birth: Date.now() }
}

//

onMounted(() => interval = setInterval(onIntervalTick, 100))
onUnmounted(() => clearInterval(interval))

//

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: all 0.25s ease;
}

.v-enter-from {
    opacity: 0;
    transform: translateX(-100%);
}

.v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}
</style>