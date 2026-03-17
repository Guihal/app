// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  ui: {},
  devtools: {
    enabled: true,
  },
  css: ["~/assets/css/main.css"],
  routeRules: {
    "/api/**": {
      proxy: "http://127.0.0.1:8000/api/**",
    },
  },
  compatibilityDate: "2025-01-15",
  runtimeConfig: {
    // Доступно только на сервере
    apiBase: "http://127.0.0.1:8000",
    public: {
      // Доступно и на клиенте, и на сервере
      apiBase: "/api",
    },
  },
});
