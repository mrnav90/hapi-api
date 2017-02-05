'use strict';

import AuthController from '../controllers/auth.controller';

module.exports = [
  { method: 'GET', path: '/auth/login', config: (new AuthController()).init() }
];
