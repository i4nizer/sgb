import { ref } from "vue"

//

const counter = ref(0)
const messages = ref<{ id: number, text: string, color: string }[]>([])

//

export default () => {

    //

    const info = (text: string) => {
        messages.value.push({ id: counter.value++, text, color: "info" })
    }
    
    const warn = (text: string) => {
        messages.value.push({ id: counter.value++, text, color: "warning" })
    }
    
    const show = (text: string, color = "info") => {
        messages.value.push({ id: counter.value++, text, color })
    }

    const error = (text: string) => {
        messages.value.push({ id: counter.value++, text, color: "error" })
    }
    
    const success = (text: string) => {
        messages.value.push({ id: counter.value++, text, color: "accent" })
    }

    const remove = (msg: { id: number, text: string, color: string }) => {
        const idx = messages.value.findIndex((m) => m.id == msg.id)
        if (idx != -1) messages.value.splice(idx, 1)
    }
    
    //

    return {
        counter,
        messages,
        info,
        warn,
        show,
        error,
        success,
        remove,
    }
}
