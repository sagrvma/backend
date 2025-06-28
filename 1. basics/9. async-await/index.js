//async functions will always return a promise that would be caught by await

const delayfn = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const delayedGreeting = async (name) => {
  await delayfn(2000);
  console.log(`Hello ${name}!`);
};

delayedGreeting("Sagar");
/*----------------------------------------------------------*/
const divideFnAsync = async (a, b) => {
  if (b == 0) {
    throw new Error("Cannot divide by 0");
  }
  return a / b;
};

const performDivision = async (a, b) => {
  try {
    const result = await divideFnAsync(a, b); //using await in front of async fn calls
    console.log("Resolved: ", result);
  } catch (error) {
    console.log("Rejected: ", error);
  }
};

performDivision(2, 1); // not using await here as this is not in an async context and no waiting is required here

const performMultipleDivisions = async () => {
  await performDivision(4, 2); //now we need to use await, since we need all these to be in order
  await performDivision(9, 0); //will wait for previous one to finish
  await performDivision(10, 2); //same
  console.log("All divisions completed!");
};

performMultipleDivisions(); //again, no need to use await here
