const EventEmitter = require("events");

const myFirstEmitter = new EventEmitter();

//Register a listener
myFirstEmitter.on("greet", (name) => {
  console.log(name);
});

myFirstEmitter.emit("greet", "Sagar");
