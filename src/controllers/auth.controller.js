'use strict';

import BaseController from '../base/base.controller';

export default class AuthController extends BaseController {
  constructor() {
    super();
  }

  init() {
    return {
      handler: (request, reply) => {
        reply('test');
        // reply.view('users/read.js');
      }
    };
  }
}
