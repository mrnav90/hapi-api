'use strict';

import Glue from 'glue';
import config from './config/app.config';
import routes from './config/app.routes';
import { SECRET_JWT_KEY } from './config/app.constant';
import { isAuthenticated } from './helpers/user';

exports.setup = (callback) => {
  let manifest = {
    connections: config.connections,
    registrations: config.registrations
  };

  Glue.compose(manifest, (err, server) => {
    if (err) {
      return callback(err);
    }

    server.auth.strategy('authenticate', 'jwt', {
      key: SECRET_JWT_KEY,
      verifyOptions: { algorithms: ['HS256'] },
      validateFunc: isAuthenticated
    });

    server.views(config.views);
    server.route(routes);

    callback(null, server);
  });
};
