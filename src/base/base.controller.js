'use strict';

import Boom from 'boom';
import Joi from 'joi';
import Async from 'async';

export default class BaseController {
  constructor() {
    this.Boom = Boom;
    this.Joi = Joi;
    this.Async = Async;
    this.request = null;
    this.reply = null;
    this.data = {};
  }

  init(request, reply) {
    this.request = request;
    this.reply = reply;
    if (request.method.toUpperCase() === 'POST') {
      this.data = request.payload;
    } else {
      this.data = request.query;
    }
  }

  response(code = 200, message = null, data = []) {
    switch (code) {
      case 200:
      case 201:
        return this.reply({
          statusCode: code,
          message: message,
          data: data
        }).code(code);
      case 204:
        return this.reply().code(204);
      case 400:
        return this.reply(this.Boom.badRequest());
      case 404:
        return this.reply(this.Boom.notFound());
      case 401:
        return this.reply(this.Boom.unauthorized());
      case 403:
        return this.reply(this.Boom.forbidden());
      default:
        break;
    }
  }

  translate(key) {
    return this.request.i18n.__(key);
  }
}
