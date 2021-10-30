/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile (file) {
    const pathToConfigFile = path.resolve('./cypress/config', `${file}.json`);

    return fs.readJson(pathToConfigFile)
}

// plugins file
module.exports = (on, config) => {
    // accept a configFile value or use local by default
    const file = config.env.configFile || 'local';

    return getConfigurationByFile(file)
};
