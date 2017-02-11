'use strict';

var dbm;
var type;
var seed;
var Promise = require('bluebird');
var Bcrypt = require('bcrypt');

/*

role: user, manager
group_id:
-> user:
 1 -> company / group
 2 -> co-leader
 3 -> supporter
 4 -> normal
 -> manager
 1 -> administrator
 2 -> publisher
 3 -> editor

*/

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return new Promise(function(resolve) {
    db.createCollection('users');
    var salt = Bcrypt.genSaltSync(10);
    db.insert('users', {
      name: 'minhman',
      email: 'minhman@gmail.com',
      role: 'user',
      group_id: 1,
      phone: '0123456789',
      password: Bcrypt.hashSync('secret', salt),
      created: new Date(),
      image: 'https://scontent.fdad3-1.fna.fbcdn.net/v/t1.0-9/13344748_1730264523858606_3240140766714948266_n.jpg?oh=d59673c08f6cc2c93bbabf8dac440efc&oe=59475311'
    });
    resolve('Success');
  });
};

exports.down = function(db) {
  return new Promise(function(resolve) {
    db.dropCollection('users');
    resolve('Success');
  });
};

exports._meta = {
  'version': 1
};
