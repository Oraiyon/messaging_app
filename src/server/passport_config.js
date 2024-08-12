import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "./models/userModel.js";

const initializePassport = (passport) => {
  passport.use(
    new Strategy(async (username, password, done) => {
      try {
        const lowerCasedUsername = username.toLowerCase();
        const user = await User.findOne({ username: lowerCasedUsername }).exec();
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default initializePassport;
