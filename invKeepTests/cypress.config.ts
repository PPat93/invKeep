import { defineConfig } from 'cypress';
import local from './cypress/config/localConfig';
import dev from './cypress/config/devConfig';

let customConfigFile;

export default defineConfig({

  e2e: {
    setupNodeEvents(on, config) {

      if (config.env.configFile === 'dev') {
        customConfigFile = dev;
      } else {
        customConfigFile = local;
      }

      Object.entries(customConfigFile).forEach(([key, value]) => {
        config.env[key] = value;
      });
      return config
    }
  }
})