/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AI_CLD_URL: string
    readonly VITE_AI_CLD_IMGSZ: string
    readonly VITE_AI_CLD_CLASSES: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}