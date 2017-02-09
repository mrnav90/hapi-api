'use strict';

import BaseController from '../base/base.controller';
import UserModel from '../models/user.model';

export default class AuthController extends BaseController {
  constructor() {
    super();
  }

  init() {
    return {
      handler: (request, reply) => {
        UserModel.comparePassword('12121212').then((res) => {
          console.log(res);
        });
        // UserModel.create({
        //   email: 'Minhman@gmail.com',
        //   phone_number: '0123456789',
        //   password: '12121212',
        //   created: new Date(),
        //   image: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/13344748_1730264523858606_3240140766714948266_n.jpg?oh=d59673c08f6cc2c93bbabf8dac440efc&oe=59475311'
        // }).then((data) => {
        //   console.log(data);
        //   reply('Done');
        // });
      }
    };
  }
}
