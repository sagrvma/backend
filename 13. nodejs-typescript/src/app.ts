import express, { Express, NextFunction, Request, Response } from "express";
import { IUser, User } from "./models/User";

const app: Express = express(); //Anything we define now will have a type
const port: number = 3000;

//Middleware
app.use(express.json());

interface CustomRequest extends Request {
  startTime?: number;
}

app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.startTime = Date.now();
  next();
});

//Request Type: <P, ResBody, ReqBody, ReqQuery, Locals>
//P is params

app.get("/", (req: Request, res: Response) => {
  //Types of Request and Response as well
  return res.status(200).send({
    success: true,
    message: "Hello, using Express with Typescript.",
  });
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find({}); //Defined the type of user that will be fetched
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
});

//POST route: new user-> name, email -> req.body
interface User {
  name: string;
  email: string;
}

app.post("/user", (req: Request<{}, {}, User>, res: Response) => {
  //Defined the type for the ReqBody as User
  const { name, email } = req.body;
  return res.status(200).json({
    success: true,
    message: "User successfully created.",
    name: name,
    email: email,
  });
});

//GET route: to get user by id
app.get("/users/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  return res.status(200).json({
    success: true,
    userId: id,
  });
});

app.listen(port, () => {
  console.log(`App is now running successfully on port ${port}`);
});
