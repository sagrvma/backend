const path = require("path");

console.log("Directory name: ", path.dirname(__filename));
//better as compared to directly using __dirname as that would break on different os, but path.dirname will

console.log("File name: ", path.basename(__filename));
//This is essentially the same as __dirname, but path.dirname() can work with any path string, not just the current file.

console.log("File extension: ", path.extname(__filename));

console.log("File name without extension: ", path.basename(__filename, ".js"));

const joinPath = path.join("/user", "documents", "node", "projects");
//Combines multiple path segments into a single path using the correct path separator for your operating system.
// Windows: \user\documents\node\projects
// Unix/Mac: /user/documents/node/projects
//path.join() is smart - it handles trailing slashes and normalizes the path automatically.

console.log("Joined path: ", joinPath);

const resolvedPath = path.resolve("user", "documents", "node", "projects");
//Resolving a path means converting a relative path into an absolute path by combining it with the current working directory (or another base path).
//Creates an absolute path by resolving the given paths relative to the current working directory.
// If current working directory is /home/username
// Result: /home/username/user/documents/node/projects
console.log("Resolved path: ", resolvedPath);

const normalizedPath = path.normalize("/user/.documents/../node/projects");
// Cleans up a path by resolving .. (parent directory) and . (current directory) segments.
console.log("Normalized path: ", normalizedPath);
//It removes the .documents/../ part because ../ cancels out the .documents directory.

//The key difference: path.resolve() always returns an absolute path, while path.join() can return relative paths.

// Works correctly on all platforms
const configPath = path.join(__dirname, "config", "database.json");

// Instead of manually doing (which breaks on Windows):
const badPath = __dirname + "/config/database.json";
