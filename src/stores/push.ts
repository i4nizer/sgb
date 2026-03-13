import { api } from "@/plugins/api"
import { Capacitor } from "@capacitor/core"
import { PushNotifications, type Token } from "@capacitor/push-notifications"
import { defineStore } from "pinia";
import { ref } from "vue";

//

export const usePushStore = defineStore("push", () => {

    //

    const connected = ref(false)

    //

    const connect = async () => {
        const isNative = Capacitor.isNativePlatform()
        if (!isNative || connected.value) return

        const perm = await PushNotifications.requestPermissions()
        if (perm.receive !== "granted") return console.info(`Push notification permission denied.`)

        await PushNotifications.register()
        PushNotifications.addListener("registration", register)
    }

    const register = async (token: Token) => {
        await api
            .post("/device", { token: token.value })
            .then(() => connected.value = true)
            .catch(() => connected.value = false)
    }

    //

    return { connected, connect, register }
})
