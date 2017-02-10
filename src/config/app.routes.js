'use strict';

import AuthController from '../controllers/auth.controller';

module.exports = [
  { method: 'POST', path: '/auth/login', config: (new AuthController()).login() },
  { method: 'POST', path: '/auth/logout', config: (new AuthController()).logout() }
];
