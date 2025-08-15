const promisify = require("./promisify");
const fse = require("fs-extra");

module.exports = promisify(fse.remove);