const path = require("path");
const mybatisMapper = require("mybatis-mapper");
const envJson = require(`${__dirname}/../env/env.json`);
const sqlPath = path.join(__dirname, "..", ".", `/sql/${envJson.version}/`);
mybatisMapper.createMapper([`${sqlPath}/base.xml`]);

var init = async function(req, res, next) {
  // req.sequelize = sequelize;
  req.mybatisMapper = mybatisMapper;

  next();
};

module.exports = init;
