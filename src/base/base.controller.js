'use strict';

import Boom from 'boom';
import Joi from 'joi';
import Async from 'async';

export default class BaseController {
  constructor() {
    this.Boom = Boom;
    this.Joi = Joi;
    this.Async = Async;
  }
}
