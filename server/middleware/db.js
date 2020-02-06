const path = require("path");
const Sequelize = require("sequelize");
const mybatisMapper = require("mybatis-mapper");
const envJson = require(`${__dirname}/../env/env.json`);
const sequelize = new Sequelize("ssafy-kiosk-db.cpwfrvk3u3vz.us-east-2.rds.amazonaws.com:3306");
const sqlPath = path.join(__dirname, "..", ".", `/sql/${envJson.version}/`);
mybatisMapper.createMapper([`${sqlPath}/base.xml`]);

var init = async function(req, res, next) {
  req.sequelize = sequelize;
  req.mybatisMapper = mybatisMapper;

  next();
};

module.exports = init;
