const userDao = require('./userDao');
const database = require('./dataSource');
const storedPinDao = require('./storedPinDao');
const boardDao = require('./boardDao');

module.exports = {
  userDao,
  database,
  storedPinDao,
  boardDao,
};
