'use strict';

process.env.SECRET = 'TestingSecret';

require('@code-fellows/supergoose');
const middleware = require('../src/auth/middleware/bearer.js');
const Users = require('../src/auth/models/users.js');
const jwt = require('jsonwebtoken');

let users = {
  admin: { username: 'admin', password: 'password' },
};

// Pre-load our database with fake users
beforeAll(async () => {
  await new Users(users.admin).save();
});

describe('Auth Middleware', () => {

  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with an incorrect token', () => {

      //const user = { username: 'admin' };
      //const token = jwt.sign(user, process.env.SECRET);

      req.headers = {
        authorization: `Bearer sdfsfs`,
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith('Invalid Login');
        });

    });

    it('logs in a user with a proper token', () => {

      const user = { username: 'admin' };
      const token = jwt.sign(user, process.env.SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).toHaveBeenCalledWith();
        });

    });

  });

});