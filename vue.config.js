const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/_variables.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === "production" 
  ? "/vue-rwc-countdown/" 
  : "/",
};