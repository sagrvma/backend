const fs = require("fs");
const path = require("path");

const newFolder = path.join(__dirname, "newFolder");

//Synchronous way
if (!fs.existsSync(newFolder)) {
  fs.mkdirSync(newFolder);
  console.log("New folder created!");
}

// const filePath = path.join(newFolder, "newFile.txt");
// fs.writeFileSync(filePath, "Hello from node js!");
// console.log("New file created!");

// const readContentFromFile = fs.readFileSync(filePath, "utf-8");
// console.log(readContentFromFile);

// fs.appendFileSync(
//   filePath,
//   "\nThis is the new line added to this file via node js!"
// );
// console.log("New content added to the file!");
// const newContent = fs.readFileSync(filePath, "utf-8");
// console.log("New added line: ", newContent);

// //Asynchronous way
// const asyncFilePath = path.join(newFolder, "asyncNewFile.txt");
// fs.writeFile(asyncFilePath, "Hello from async node js!", (err) => {
//   if (err) throw err;
//   else console.log("New async file created!");

//   const readAsyncContentFromFile = fs.readFile(
//     asyncFilePath,
//     "utf-8",
//     (err, data) => {
//       if (err) throw err;
//       console.log(data);
//       fs.appendFile(
//         asyncFilePath,
//         "\nThis is the new line added via async node js!",
//         (err) => {
//           if (err) throw err;
//           console.log("New content added to the file (async)!");

//           fs.readFile(asyncFilePath, "utf-8", (err, updatedData) => {
//             if (err) throw err;
//             console.log("Updated file content: ", updatedData);
//           });
//         }
//       );
//     }
//   );
// });

//BUT THE ABOVE ASYNC WAY CREATES CALLBACK HELL: deeply nested callbacks that make code hard to read

const fsPromises = require("fs").promises;

const modernAsyncFunction = async () => {
  try {
    const modernAsyncFilePath = path.join(newFolder, "modernAsyncFile.txt");

    await fsPromises.writeFile(modernAsyncFilePath, "Hello from modern async!");
    console.log("File written!");

    const content = await fsPromises.readFile(modernAsyncFilePath, "utf-8");
    console.log(content);

    await fsPromises.appendFile(
      modernAsyncFilePath,
      "\nNew line added via modern async."
    );
    console.log("New line appended!");

    const updatedContent = await fsPromises.readFile(
      modernAsyncFilePath,
      "utf-8"
    );
    console.log("Updated file content: ", updatedContent);
  } catch (error) {
    console.log("Error: ", error);
  }
};

modernAsyncFunction();
