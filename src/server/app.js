import express from "express";
import router from "./routes.js";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import initializePassport from "./passport_config.js";

dotenv.config();

const makeApp = (database) => {
  if (database) {
    database();
  }
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
      }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  initializePassport(passport);

  app.use("/", router);

  return app;
};

export default makeApp;
