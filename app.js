import express from "express";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(
  cors({
    credentials: true,
    origin:
      process.env.FRONTEND_URL || "https://taupe-sprinkles-030f6c.netlify.app",
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000);
