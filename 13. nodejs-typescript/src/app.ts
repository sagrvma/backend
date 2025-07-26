import express, { Express, Request, Response } from "express";

const app: Express = express(); //Anything we define now will have a type
const port: number = 3000;

app.use(express.json()); //Middleware

app.get("/", (req: Request, res: Response) => {
  //Types of Request and Response as well
  return res.status(200).send({
    success: true,
    message: "Hello, using Express with Typescript.",
  });
});

app.listen(port, () => {
  console.log(`App is now running successfully on port ${port}`);
});
