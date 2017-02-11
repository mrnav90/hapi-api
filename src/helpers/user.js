'use strict';

import UserModel from '../models/user.model';
import JsonWebToken from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config/app.constant';

exports.isAuthenticated = (decoded, request, callback) => {
  if (decoded && decoded.id) {
    UserModel.findById(decoded.id).then((res) => {
      if (!res) {
        return callback(null, false);
      }
      request.redis.get(request.headers.authorization, (err, token) => {
        if (err) {
          return callback(null, false);
        }
        if (token) {
          return callback(null, true);
        }
        return callback(null, false);
      });
    });
  }
};

exports.createToken = (user) => {
  let token = JsonWebToken.sign({ id: user._id, name: user.name, email: user.email }, SECRET_JWT_KEY, { algorithm: 'HS256' });
  return token;
};

exports.userInfo = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    avatar: user.image,
    created: user.created
  };
};
