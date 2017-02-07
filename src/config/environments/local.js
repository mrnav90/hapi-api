'use strict';

exports.config = {
  registrations: [
    {
      plugin: {
        register: '@nesive/hapi-mailer',
        options: {
          transport: {
            service: 'Gmail',
            auth: {
              user: 'example@gmail.com',
              pass: 'password'
            }
          }
        }
      }
    },
    {
      plugin: {
        register: '@nesive/hapi-mongoose-connector',
        options: {
          uri: '127.0.0.1:27017/triplink'
        }
      }
    },
    {
      plugin: {
        register: 'good',
        options: {
          reporters: [{
            reporter: 'good-console',
            args: []
          }]
        }
      }
    }
  ]
};
