import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { genPassword, getUserByName, createUser } from "../helper.js";

const router = express.Router();

router.route("/signup").post(async (req, res) => {
  const { username, password } = req.body.data;

  const isUserNameExist = await getUserByName(username);

  // Name validation
  if (isUserNameExist) {
    res.status(400).send({ message: "The user name already exist." });
  }
  // Password length validation
  else if (password.length < 8) {
    res
      .status(400)
      .send({ message: "Password must be at least 8 characters long." });
    return;
  }
  // Password characters validation
  else if (
    !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)
  ) {
    res.status(400).send({
      message:
        "Password must have a nummber, a small letter, a capital letter, a number and at least one of the symbols (@!#%&)",
    });
    return;
  }
  // Creating user in DB
  else {
    const hashedPassword = await genPassword(password);
    const result = await createUser({
      username: username,
      password: hashedPassword,
    });
    res.send(result);
  }
});

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body.data;
  // console.log(req.body.data);
  // console.log(username, password);
  const userData = await getUserByName(username);
  var userName = false;
  var userPassword = false;
  var passwordMatch = false;

  if (userData) {
    userName = userData.username;
    userPassword = userData.password;
    const passwordMatching = await bcrypt.compare(password, userPassword);
    if (passwordMatching) {
      passwordMatch = "true";
    }
  }
  if (!userName || !passwordMatch) {
    res.status(401).send({ message: "The user name or password is incorrect" });
  } else {
    const token = jwt.sign({ id: userData._id }, process.env.SECRET_KEY);
    res.send(token);
  }
});

export const userRouter = router;
