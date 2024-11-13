const { defineConfig } = require("cypress");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;


module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);

      config.env.stepDefinitions = [
        "cypress/e2e/step_definitions/**/*.js",
      ];

      return config;
    },
    env: {
      base_url: "https://wger.de/pt-br/",
      user: ["outsera_cypress", "outsera_cypress@email.com", "outseraU8$3"]
    },
    specPattern: [
      "cypress/e2e/features/*.feature",
    ],
  }
});