import { ref } from "vue"

//

export default () => {

    //

    const stream = ref<MediaStream>()
    const cameras = ref<MediaDeviceInfo[]>([])

    //
    
    const list = async () => {
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

    return { stream, cameras, list, begin, terminate }
}