import express from "express";
import {connections} from "./config/db";
import  port  from "./config/env";
import routers from "./router/userRouter";

// import main from './mailer/nodeMailer'

 const app = express();
// main
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connections();

app.use(`/user`, routers);
app.set('view engine', 'ejs');
app.listen(port, () => {
    console.log("server is started");
  });
  