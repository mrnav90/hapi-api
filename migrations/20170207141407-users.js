'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createCollection('users', function(error, collection) {
    collection.insertOne('users', {
      name: 'minhman',
      email: 'minhman@gmail.com'
    });
  });
};

exports.down = function(db, callback) {
  db.dropCollection('users', callback);
};

exports._meta = {
  'version': 1
};
