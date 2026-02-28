/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly AI_CLD_URL: string
    readonly AI_CLD_IMGSZ: string
    readonly AI_CLD_CLASSES: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}