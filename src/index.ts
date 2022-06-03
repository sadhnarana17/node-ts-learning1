import runApp from './app';

const logger = require('./service/logger').default;

process.env.TZ = 'UTC';

const appPort = process.env.PORT || 3000;

const setupCluster = async () => {
  const appData = await runApp();
  const { app } = appData;
  app.listen(appPort, () => {
    logger('info', `HTTP server is up and running on port ${appPort}`);
  });
};

setupCluster();
