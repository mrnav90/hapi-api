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
    this.birthday = String;
    this.sex = Number;
    this.role = String;
    this.group_id = Number;
    this.phone = String;
    this.password = String;
    this.created = Date;
    this.imageAvatar = String;
    this.videoAvatar = String;
    this.favorites = [String];
    this.socials = {
      facebook: String,
      twitter: String,
      linkedin: String
    };
    this.social_accounts = {
      facebook: {
        name: String,
        email: String,
        phone: String
      },
      google: {
        name: String,
        email: String
      }
    };
    this.biography = String;
    this.payment = {
      credit_card: {
        card_number: String,
        security_code: String,
        card_type: String,
        month: String,
        year: String
      },
      bank_account: {
        account_number: String,
        account_name: String
      }
    };
    this.address = {
      street: String,
      neighborhood: String,
      precinct: String,
      district: String,
      city: String
    };
  }

  static collectionName() {
    return 'users';
  }

  static comparePassword(password, passwordHash) {
    return new Promise((resolve, reject) => {
      Bcrypt.compare(password, passwordHash, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  static findByEmail(email) {
    return this.findOne({ email: email.toLowerCase() });
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
