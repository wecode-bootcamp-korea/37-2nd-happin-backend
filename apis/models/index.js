const userDao = require('./userDao');
const database = require('./dataSource');
const storedPinDao = require('./storedPinDao');
const boardDao = require('./boardDao');
const profileDao = require('./profileDao');
const mainDao = require('./mainDao');
const pinDao = require('./pinDao');

module.exports = {
  userDao,
  mainDao,
  database,
  storedPinDao,
  boardDao,
  profileDao,
  pinDao,
};
