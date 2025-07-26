console.log("Hello from TypeScript!");

//Basic Types
let isDone: boolean = false; //Boolean
let num: number = 5; //Number
let name: string = "Sagar"; //String
let list: number[] = [1, 2, 3, 4, 5]; //List
let products: Array<string> = ["Product1", "Product2", "Product3"]; //Alternate way of defining the type of List

let randomVal: any = 4; //Any, unadvisable to be used
randomVal = "Sagar"; //Can be assigned value of any type
randomVal = true;

let xyz: undefined = undefined; //Undefined
let yz: null = null; //Null

enum Color {
  Red,
  Green,
  Blue,
}
let d: Color = Color.Blue; //Can only have the values defined inside the enum

let abc: [string, number] = ["Sagar", 100]; //Tuple: Can only have the same number and same types of values as defined in the same order

//Interfaces
//Interfaces define the structure of our data

interface User {
  name: string; //Mandatory by default
  id: number; //Mandatory by default
  email?: string; //Optional
  readonly createdAt: Date; //Read only, Also defined as mandatory as we didnt put the ?
}

const user: User = {
  name: "Sagar",
  id: 1,
  //   email: "sagarverma@gmail.com",
  createdAt: new Date(),
};

//Types
type Product = {
  title: string;
  price: number;
};

const product1: Product = {
  title: "Product 1",
  price: 200,
};

//Functions, with type annotations
const add = (a: number, b: number): number => {
  return a + b;
};

const greet = (name: string, greeting: string) => {
  return `${name} ${greeting}`;
};
