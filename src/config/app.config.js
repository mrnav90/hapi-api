'use strict';

import Handlebars from 'handlebars';
import HapiJsonView from '@nesive/hapi-json-view';
import Hoek from 'hoek';
import Path from 'path';

let internals = {};
let environment = require('./environments/' + process.env.NODE_ENV);

internals.config = {
  connections: [
    {
      host: '127.0.0.1',
      port: process.env.PORT || 3000,
      routes: {
        cors: {
          headers: ['Authorization', 'Content-Type', 'If-None-Match', 'If-Modified-Since']
        }
      }
    }
  ],
  registrations: [
    {
      plugin: {
        register: '@nesive/hapi-mailer',
        options: {
          views: {
            engines: {
              html: {
                module: Handlebars.create(),
                layoutPath: 'layouts',
                layout: 'default'
              },
              text: {
                module: Handlebars.create()
              }
            },
            relativeTo: Path.join(__dirname, '../src/templates/emails')
          }
        }
      }
    },
    {
      plugin: {
        register: 'hapi-auth-jwt2'
      }
    },
    {
      plugin: {
        register: 'inert'
      }
    },
    {
      plugin: {
        register: 'vision'
      }
    },
    {
      plugin: {
        register: 'hapi-camo',
        options: {
          uri: 'mongodb://localhost/triplink'
        }
      }
    },
    {
      plugin: {
        register: 'lout',
        options: {
          endpoint: '/'
        }
      }
    }
  ],
  views: {
    engines: {
      js: {
        module: HapiJsonView.create(),
        contentType: 'application/json'
      }
    },
    relativeTo: Path.join(__dirname, '../src/templates'),
    partialsPath: 'partials',
    helpersPath: 'helpers'
  }
};

Hoek.merge(internals.config, environment.config, true, false);
module.exports = internals.config;
