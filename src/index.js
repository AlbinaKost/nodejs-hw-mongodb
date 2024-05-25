import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstart = async () => {
  await initMongoConnection();
  setupServer();
};

bootstart();
