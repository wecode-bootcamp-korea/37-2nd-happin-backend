const database = require("./dataSource");

const getMainPage = async (
  id,
  search,
  age,
  gender,
  interests,
  limit,
  offset,
  regInterest
) => {
  let filter = (orderBy = pagenation = ``);
  age ? (filter += ` AND u.age IN (${age})`) : ``;
  gender ? (filter += ` AND u.gender IN (${gender})`) : ``;
  interests ? (filter += ` AND i.interest IN (${interests})`) : ``;
  regInterest
    ? (orderBy += ` ORDER BY FIELD (i.id,${[regInterest]}) DESC, p.created_at DESC`)
    : ``;
  limit ? (pagenation += ` LIMIT ${limit}`) : ``;
  limit && offset ? (pagenation += ` OFFSET ${offset*limit}`) : ``;

  return await database.query(
    `SELECT DISTINCT
    p.id AS pinId, 
    group_concat(i.interest) AS interest, 
    u.username, 
    u.profile_image AS profileImage, 
    p.title,
    p.content,
    p.pin_image AS pinImage 
    FROM users u 
    INNER JOIN pins p on u.id = p.user_id 
    INNER JOIN pin_interests pi on p.id = pi.pin_id 
    INNER JOIN interests i on i.id = pi.interest_id
    WHERE p.title LIKE ("%"?"%")
    ${filter} 
    OR u.username LIKE ("%"?"%")
    ${filter} 
    OR p.content LIKE ("%"?"%")
    ${filter}
    OR i.interest LIKE ("%"?"%")
    ${filter}
    GROUP BY p.id
    ${orderBy}
    ${pagenation}
      `,
    [search, search, search, search]
  );
};

const createInterest = async (id, interests) => {
  
  let B = ["강아지", "게임", "풍경"];
  let [convertInterest] = await database.query(
    ` SELECT GROUP_CONCAT(i.id)    
  AS interests_id FROM interests i    
  WHERE i.interest 
  IN (?)
`,[B]
  );
  replaceDot = convertInterest.interests_id.replace(/,/g, "");
  let bulkInsert = [];
  for (i in replaceDot) {
    bulkInsert.push([+id, +replaceDot[i]]);
  }

  return await database.query(
    `INSERT INTO user_interests
  (user_id,interest_id)
  VALUES ?
      `,[bulkInsert]
  );
};
module.exports = {
  getMainPage,
  createInterest,
};

// `INSERT INTO user_interests
// (user_id,interest_id)
// VALUES(1,
//     (SELECT GROUP_CONCAT(i.id)
//     AS interests_id FROM interests i
//     WHERE i.interest
//     IN ("강아지","게임","풍경")))

//     `
// `SELECT GROUP_CONCAT(i.id)
// AS interests_id FROM interests i
// WHERE i.interest
// IN ("강아지","게임","풍경")
// `
