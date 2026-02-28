import { Camera } from "@capacitor/camera"
import { Capacitor } from "@capacitor/core"
import { ref } from "vue"

//

export default () => {

    //

    const stream = ref<MediaStream>()
    const cameras = ref<MediaDeviceInfo[]>([])
    const permitted = ref(false)

    //
    
    const list = async () => {
        await requestPerm()
        const devices = await navigator.mediaDevices.enumerateDevices()
        cameras.value = devices.filter(device => device.kind === "videoinput")
        return cameras.value
    }

    const begin = async (id?: string, width?: number, height?: number) => {
        if (!id && cameras.value.length <= 0) throw new Error("No available camera.")
        const camera = cameras.value[0]

        const video: MediaStreamConstraints["video"] = {
            deviceId: (id || camera) ? { exact: id || camera?.deviceId } : undefined,
            width: { exact: width || 720 },
            height: { exact: height || 720 },
            aspectRatio: { exact: 1 },
        }

        stream.value = await navigator.mediaDevices.getUserMedia({ video, audio: false })
        return stream.value
    }

    const terminate = async () => {
        if (!stream.value) return
        stream.value.getTracks().forEach(track => track.stop())
        stream.value = undefined
    }

    const requestPerm = async () => {
        if (!Capacitor.isNativePlatform()) return await requestPermWeb().then(() => permitted.value = true)
        return await requestPermNative().then(() => permitted.value = true)
    }

    const requestPermWeb = async () => {
        return await navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((res) => res.getTracks().forEach(track => track.stop()))
            .then(() => permitted.value = true)
    }

    const requestPermNative = async () => {
        let status = await Camera.checkPermissions()
        if (status.camera == "granted") return await requestPermWeb()
            
        status = await Camera.requestPermissions({ permissions: ["camera"] });
        if (status.camera == "granted") return await requestPermWeb()
        throw new Error("Camera permission denied.")
    }

    //

    return { 
        stream, 
        cameras,
        permitted,
        list, 
        begin, 
        terminate, 
        requestPerm, 
        requestPermWeb, 
        requestPermNative,
    }
}