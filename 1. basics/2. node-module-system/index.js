const firstModule = require("./first-module");

console.log(firstModule.add(1, 2));

try {
  console.log("Trying to divide by zero.");
  let result = firstModule.divide(10, 5);
  console.log("result:", result);
} catch (error) {
  console.log("Caught the following error: ", error.message);
}

//module wrapper
(function wrapper(exports, require, __filename, __dirname) {
  //your module code goes here
});

console.log(arguments);
