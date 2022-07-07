import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    supportFile: "cypress/support/index.js",
    env: {
        backendUrl: "http://localhost:3000/api/assets"
    }
  }
})
