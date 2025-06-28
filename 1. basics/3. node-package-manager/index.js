const lodash = require("lodash");

const names = ["sagar", "frank", "tyler", "travis"];

const capitalized = lodash.map(names, lodash.capitalize);
console.log(capitalized);
