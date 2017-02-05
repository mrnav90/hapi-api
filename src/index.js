'use strict';

import Glue from 'glue';
import config from './config/app.config';
import routes from './config/app.routes';
import { SECRET_JWT_KEY } from './config/app.constant';

exports.setup = (callback) => {
  let manifest = {
    connections: config.connections,
    registrations: config.registrations
  };

  Glue.compose(manifest, (err, server) => {
    if (err) {
      return callback(err);
    }

    server.auth.strategy('jwt', 'jwt', {
      key: SECRET_JWT_KEY,
      verifyOptions: { algorithms: ['HS256'] }
    });

    server.views(config.views);
    server.route(routes);

    callback(null, server);
  });
};
