import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';


const bootstart = async () => {
  await initMongoConnection();
  await createDirIfNotExists(UPLOAD_DIR);
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  setupServer();
};

void bootstart();
