import { defineConfig } from 'cypress'
import configLocal from './cypress/config/local'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      Object.entries(configLocal).forEach(([key, value]) => {
        config[key] = value;
      });
      return config
    },
  }
})
