'use strict';

import BaseController from '../base/base.controller';
import UserModel from '../models/user.model';
import { connect } from 'camo';

export default class AuthController extends BaseController {
  constructor() {
    super();
  }

  init() {
    return {
      handler: (request, reply) => {
        connect('mongodb://localhost/triplink').then(() => {
          UserModel.create({
            name: 'minhman',
            email: 'minhman@gmail.com',
            phone_number: '0123456789',
            password: '12121212',
            created: new Date(),
            image: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/13344748_1730264523858606_3240140766714948266_n.jpg?oh=d59673c08f6cc2c93bbabf8dac440efc&oe=59475311'
          });
          return UserModel.save();
        });
      }
    };
  }
}
