import { defineStore } from "pinia"
import { ref } from "vue"

//

export const useServerStore = defineStore("server", () => {

    //

    const url = ref("")
    const busy = ref(false)
    const alive = ref(false)
    const interval = ref<ReturnType<typeof setInterval>>()

    //

    const connect = async (server: string, heartbeat: number = 7 * 60 * 1000) => {
        url.value = server
        const callback = () => Promise
            .resolve()
            .then(() => busy.value = true)
            .then(() => fetch(server))
            .then(() => alive.value = true)
            .catch(() => alive.value = false)
            .finally(() => busy.value = false)

        if (interval.value) clearInterval(interval.value)
        interval.value = setInterval(() => !busy.value && callback(), heartbeat)
        await callback()
    }

    const disconnect = () => {
        busy.value = false
        alive.value = false
        clearInterval(interval.value)
        interval.value = undefined
    }

    //

    return { url, busy, alive, interval, connect, disconnect }
})
