const wrapperExplorer = require("./wrapper-explorer");
//require allows conditional importing that import ES6 doesn't

console.log("Wrapper module wrapper demo.");

console.log("__filename in wrapper demo", __filename);
console.log("__dirname in wrapper demo", __dirname);

wrapperExplorer.greet("Sagar");
