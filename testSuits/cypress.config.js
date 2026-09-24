const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://ask.permission.ai',

    //viewportWidth: 1440,
    //viewportHeight: 900,

    video: true,

    defaultCommandTimeout: 50000,
    pageLoadTimeout: 50000,
    requestTimeout: 100000,
    responseTimeout: 100000,

    retries: {
      runMode: 1,
      openMode: 0,
    },

    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push(
            '--unsafely-treat-insecure-origin-as-secure=https://ask.permission.ai'
          );
        }

        return launchOptions;
      });

       on('task', {

        async evaluatePermissionResponse(response) {

          const { assertions } = await import('promptfoo');

          const result = await assertions.runAssertion({
            assertion: {
              type: 'javascript',

              value: (output) => {

                const text = output.toLowerCase();

                const mentionsPermission =
                  text.includes('permission');

                const hasUsefulExplanation =
                  output.trim().length > 50;

                const hasNoObviousError =
                  !text.includes('something went wrong') &&
                  !text.includes('internal server error');

                const pass =
                  mentionsPermission &&
                  hasUsefulExplanation &&
                  hasNoObviousError;

                return {
                  pass,
                  score: pass ? 1 : 0,
                  reason: pass
                    ? 'Response gives a meaningful explanation of Permission.'
                    : 'Response does not provide a meaningful explanation of Permission.'
                };
              }
            },

            test: {
              vars: {
                topic: 'What is Permission?'
              },
              assert: []
            },

            providerResponse: {
              output: response
            }
          });

          return {
            pass: result.pass,
            score: result.score,
            reason: result.reason
          };
        }

      });


      return config;
    },
  },
});