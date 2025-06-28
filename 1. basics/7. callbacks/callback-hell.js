const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading data from input file: ", err);
    return;
  }
  console.log(data);

  const modifiedData = data.toUpperCase();

  fs.writeFile("output.txt", modifiedData, (err) => {
    if (err) {
      console.log("Error writing data to output file: ", err);
      return;
    }

    fs.readFile("output.txt", "utf-8", (err, data) => {
      if (err) {
        console.log("Error reading data from output file: ", err);
        return;
      }
      console.log(data);
    });
  });
});
