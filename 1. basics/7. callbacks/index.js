//Callbakcs: any function which is passed as a parameter to another function.
const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error in reading file: ", err);
    return;
  }
  console.log(data);
});
