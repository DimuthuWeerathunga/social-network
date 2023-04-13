/// <reference types="vite/client" />

interface ImportMetaEnv {
  // more env variables...
  readonly VITE_AUTH_SERVICE_BACKEND_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
