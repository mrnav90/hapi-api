'use strict';

import Application from './index';

Application.setup((error, server) => {
  if (error) {
    throw error;
  }
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.info('Server running at: ', server.info.uri);
  });
});
