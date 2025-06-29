/*
MongoDB: a noSQL Database.
Document: a record composed of field-value pairs, similar to a JSON object.
Collection: a group of documents, equivalent to tables in relational databases. Can contain various
datatypes including numbers, strings, booleans, arrays and nested documents.

Mongoose: a nodeJS base Object Data Modeling (ODM) library for mongoDB. Creates a connection b/w mongoDB and the nodeJS runtime environment. Serves as a OOP JS library that provides a straightforward, schema-based solution to model application data.

What Problem Does Mongoose Solve?
Mongoose aims to solve the challenge of enforcing a specific schema at the application layer. By default, MongoDB has a very flexible data model where "anything goes," which makes databases easy to alter and update but can be challenging for developers who are used to more rigid schemas. Mongoose addresses this by forcing a semi-rigid schema from the beginning.

Mongoose provides several powerful features:
1. Reduces the burden of dealing with nested callbacks from async operations
2. Provides a simple yet rich API for database interactions
3. Easy access to the native database/collection when needed
4. Ability to model your data with custom interfaces
5. Built-in type casting, validation, query building, business logic hooks, and more out of the box
6. Schema enforcement and model validation to make data manipulation effortless

*/
const mongoose = require("mongoose");

const password = "ofZ59cn85BxutfMS";

mongoose
  .connect(
    `mongodb+srv://sagrvma:${password}@mongodb-basics.k0rywgn.mongodb.net/`
  )
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((e) => {
    console.log(e);
  });

const userSchema = new mongoose.Schema({
  //Creates a new mongoose object that will define the structure and data types for user documents.
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String], //array of strings
  createdAt: { type: Date, default: Date.now }, //time object
});

const User = mongoose.model("User", userSchema); //Creates a mongoose model from our our previously defined schema.
//Transforms the schema into a working model that can interact with our mongoDB database.
//Result: Creates a constructor function that can be used to CRUD documents in our mongoDB collection.

const runQueryExample = async () => {
  try {
    // create a new document
    const newUser = await User.create({
      //Creates and saves the document, both in one step
      //Returns the document with mongoDB's assigned _id
      name: "Drake",
      email: "ovod@gmail.com",
      age: 38,
      isActive: false,
      tags: ["artist", "musician"],
    });

    //Alternate way: first create->then save, useful when we need to manipulate the document before saving.
    const newerUser = new User({
      //new User() creates a document instance in memory
      name: "Sagar Burma",
      email: "sagarburma@gmail.com",
      age: 23,
      isActive: true,
      tags: ["genius", "casanova", "millionaire"],
    });
    await newerUser.save(); //Saves that instance to the database.

    console.log("New user created", newUser);

    //READ OPERATIONS----------------------------
    const allUsers = await User.find({}); //Returns all documents in the collection, empty object {} means no filter.
    console.log(allUsers);

    const inactiveUsers = await User.find({ isActive: false }); //Returns all users with the matching filter.
    console.log(inactiveUsers);

    const firstUserWithMatchingCriteria = await User.findOne({
      isActive: true,
    }); //Returns only the first user that matches the criteria.
    console.log(firstUserWithMatchingCriteria);

    const userFoundById = await User.findById("68612f434a3d5d159ecf80c5"); //shorthand to finding by mongoDB's _id field.
    //Equivalent to User.findOne({_id: "68612f434a3d5d159ecf80c5"})
    console.log(userFoundById);

    //QUERY MODIFIERS----------------------------
    const selectedFields = await User.find().select("name email -_id"); //Will show name and email but won't get _id
    console.log(selectedFields);

    const limitedUsersWithSkip = await User.find().limit(5).skip(1); //Pagination
    console.log(limitedUsersWithSkip);

    const sortedUsersByAge = await User.find().sort({ age: -1 }); //Descending order of age, age:1 for ascending. Can also sort by multiple fields.
    console.log(sortedUsersByAge);

    const countInactiveUsers = await User.countDocuments({ isActive: false });
    console.log("Number of inactive users = ", countInactiveUsers);

    //UPDATE OPERATIONS--------------------------
    const updatedUser = await User.findByIdAndUpdate(
      "68613016594b5aa0625e9879",
      {
        $set: { age: 100 }, //Sets the age to 100.
        $push: { tags: "updated" }, //Adds "updated" to the tags array.
      },
      { new: true } //new determines which version of the document will be returned to updatedUser. By default the older unupdated one is returned.
    );
    console.log("Updated user successfully", updatedUser);

    //DELETE OPERATIONS--------------------------
    const deletedUser = await User.findByIdAndDelete(
      //Returns the deleted document or null if not found.
      "686136e1b1d522d37abc1de6"
    );
    console.log("Deleted user successfully", deletedUser);
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    mongoose.connection.close();
  }
};

runQueryExample();
