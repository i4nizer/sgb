import { defineStore } from "pinia";
import { ref } from "vue";

//

export const useParameterStore = defineStore("parameter", () => {

    //

    const minIoU = ref(0.9)
    const minScore = ref(0.25)
    const maxBoxCount = ref(100)

    //

    return {
        minIoU,
        minScore,
        maxBoxCount,
    }

}, { persist: true })
