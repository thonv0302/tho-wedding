import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxtjs/google-fonts", "@nuxt/image"],
  googleFonts: {
    families: {
      Tangerine: [400, 700],
      "Dancing Script": [400, 500, 600, 700],
      Pacifico: [400, 500, 600, 700],
      "Be Vietnam Pro": [100, 200, 300, 400, 500, 600, 700, 800, 900], // Specify the weights you want
      Bungee: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Saira: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      "Great Vibes": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  // routeRules: {
  //   // Chạy ở chế độ tĩnh cho tất cả các trang
  //   '/**': { prerender: true }
  // },
  // image: {
  //   dir: "assets/images",
  // },
});
