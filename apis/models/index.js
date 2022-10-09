const userDao = require('./userDao');
const database = require('./dataSource');
const storedPinDao = require('./storedPinDao');
const boardDao = require('./boardDao');
const profileDao = require('./profileDao');

module.exports = {
  userDao,
  database,
  storedPinDao,
  boardDao,
  profileDao,
};
