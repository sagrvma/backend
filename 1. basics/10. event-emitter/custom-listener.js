const EventEmitter = require("events");

class MyCustomEmitter extends EventEmitter {
  //extending EventEmitter class gives us all its functionalities
  //like .on(), .emit(), .off() etc.
  constructor() {
    super(); //calls the parent constructor
    this.greeting = "Hello";
  }

  greet(name) {
    this.emit("greeting", `${this.greeting}, ${name}`); //emits a greeting event
  }
}

const myCustomEmitter = new MyCustomEmitter();

myCustomEmitter.on("greeting", (input) => {
  console.log("Greeting event:", input);
});

myCustomEmitter.greet("Sagar");

/*
Execution Flow
1. myCustomEmitter.greet("Sagar") is called
2. greet() method executes this.emit("greeting", "Hello, Sagar")
3. EventEmitter finds all listeners for "greeting" event
4. Listener function executes with "Hello, Sagar" as the input
5. Console logs: "Greeting event: Hello, Sagar"
*/
