'use strict';

import BaseController from '../base/base.controller';
import UserModel from '../models/user.model';
import { createToken, userInfo } from '../helpers/user';

export default class AuthController extends BaseController {
  constructor() {
    super();
  }

  login() {
    return {
      tags: ['auth'],
      description: 'Logs the user in.',
      validate: {
        payload: {
          email: this.Joi.string().email().required(),
          password: this.Joi.string().min(6).max(50).required()
        }
      },
      handler: (request, reply) => {
        let email = request.payload.email;
        let password = request.payload.password;
        this.Async.waterfall([
          (callback) => {
            UserModel.findByEmail(email).then((user) => {
              if (!user) {
                return reply(this.Boom.notFound());
              }
              callback(null, user);
            });
          },
          (user, callback) => {
            UserModel.comparePassword(password, user.password).then((res) => {
              if (!res) {
                return reply(this.Boom.unauthorized());
              }
              callback(null, user);
            });
          },
          (user) => {
            let token = createToken(user);
            let cookie_options = {
              ttl: 365 * 24 * 60 * 60 * 1000,
              encoding: 'none',
              isSecure: true,
              isHttpOnly: true,
              clearInvalid: false,
              strictHeader: true
            };
            reply.view('users/read.js', { code: 200, message: 'Login successfully', user: userInfo(user) })
              .header('Authorization', token)
              .state('token', token, cookie_options);
          }
        ]);
      }
    };
  }

  logout() {
    return {
      tags: ['auth'],
      description: 'Logs the user out.',
      auth: {
        strategy: 'authenticate',
        mode: 'required'
      },
      handler: (request, reply) => {
        reply().code(204);
      }
    };
  }
}
