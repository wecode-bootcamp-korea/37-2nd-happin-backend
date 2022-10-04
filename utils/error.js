const catchAsync = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

const globalErrorHandler = (error, req, res, next) => {
  console.error(error.stack);
  error.statusCode || 500;
  res.status(error.statusCode).json({ message: error.message });
};

//   const affectedRowsErrorHandler = async (result) => {
//     if (result.affectedRows !== 1) {
//       const error = new Error('WRONG_INPUT_REQUEST');
//       error.statusCode = 400;

//       throw error;
//     }
//   };

module.exports = {
  catchAsync,
  globalErrorHandler,
  // affectedRowsErrorHandler,
};
