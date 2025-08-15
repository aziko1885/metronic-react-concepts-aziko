const { exec } = require("node:child_process");
const promisify = require("./promisify");

module.exports = promisify(exec);