const multer = require('multer');

const upload = multer({
  limits: { fileSize: 10485760 },
});

module.exports = {
  upload,
};
