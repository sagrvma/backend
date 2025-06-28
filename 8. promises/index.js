//Promise: a JS object that represents the eventual completion or failure of an asynchronous operation.
const delayFn = (time) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, time);
  });
};

console.log("Code execution starts (sync)");
delayFn(2000).then(() => {
  console.log("Promise resolved after 2 seconds (async)");
});
console.log("Code execution ends (sync)");
/*--------------------------------------------------------*/
const divideFn = (a, b) => {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject("Cannot divide by 0.");
    } else {
      resolve(a / b);
    }
  });
};

divideFn(5, 0)
  .then((res) => console.log("Resolved: ", res))
  .catch((err) => console.log("Rejected: ", err));
