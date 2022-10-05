const database = require("../apis/models/dataSource");

const countInterests = async (req, res, next) => {
  let { id } = req;
  const userInterests = await database.query(
    `
    SELECT 
    (interest_id) 
    FROM user_interests 
    WHERE user_id= ?
        `,
    [id]
  );

  let regInterest = [];
  for (i in userInterests) {
    regInterest.push(userInterests[i].interest_id);
  }
  if (userInterests.length >= 3) {
    req.regInterest = regInterest;
    return next();
  } else {
    const error = new Error(`Choose 3 or more interests`);
    error.statusCode = 400;
    next(error);
  }
};

module.exports = { countInterests };
