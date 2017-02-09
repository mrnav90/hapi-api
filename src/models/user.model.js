'use strict';

import BaseModel from '../base/base.model';

export default class UserModel extends BaseModel {
  constructor() {
    super();
    this.name = {
      type: String,
      required: true
    };
    this.email = {
      type: String,
      required: true,
      index: {
        unique: true
      }
    };
    this.phone_number = String;
    this.password = {
      type: String,
      select: false
    };
    this.created = Date;
    this.image = String;
  }
}
