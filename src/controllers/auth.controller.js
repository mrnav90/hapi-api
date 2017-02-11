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
        this.init(request, reply);
        this.Async.waterfall([
          (callback) => {
            UserModel.findByEmail(this.data.email).then((user) => {
              if (!user) {
                return this.response(404);
              }
              callback(null, user);
            });
          },
          (user, callback) => {
            UserModel.comparePassword(this.data.password, user.password).then((res) => {
              if (!res) {
                return this.response(401);
              }
              callback(null, user);
            });
          },
          (user) => {
            let token = createToken(user);
            this.request.redis.set(token, 'valid');
            return this.response(200, this.translate('login'), userInfo(user)).header('Authorization', token);
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
        this.init(request, reply);
        this.request.redis.del(request.headers.authorization);
        return this.response(204);
      }
    };
  }
}
