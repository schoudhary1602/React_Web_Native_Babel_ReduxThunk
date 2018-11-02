'use strict'
const sequelize = require('../DBConfig')

const db = {
};


db.sequelize = sequelize;

/******************** User *************************/
db.Users = require('../model/user/user.model')(sequelize);
db.Users.sync({ force: false });

db.Tokens = require('../model/user/token.model')(sequelize);
db.Tokens.sync({ force: false });


module.exports = db;