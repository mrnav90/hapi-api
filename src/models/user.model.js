'use strict';

import BaseModel from '../base/base.model';
import Bcrypt from 'bcrypt';

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

  static collectionName() {
    return 'users';
  }

  static comparePassword(password) {
    return new Promise((resolve, reject) => {
      Bcrypt.compare(password, this.password, (error) => {
        if (error) {
          reject(false);
        }
        resolve(true);
      });
    });
  }

  preSave() {
    let salt = Bcrypt.genSaltSync(10);
    if (this.email) {
      this.email = this.email.toLowerCase();
    }
    if (this.name) {
      this.name = this.name.toLowerCase();
    }
    if (this.password) {
      this.password = Bcrypt.hashSync(this.password, salt);
    }
  }
}
