import { client } from "./index.js";
import bcrypt from "bcrypt";

async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function getUserByName(username) {
  return await client
    .db("EntertainmentCritique")
    .collection("users")
    .findOne({ username: username });
}

async function createUser(data) {
  return await client
    .db("EntertainmentCritique")
    .collection("users")
    .insertOne(data);
}

async function getAllPosts(filter) {
  return await client
    .db("EntertainmentCritique")
    .collection("data")
    .find(filter)
    .toArray();
}

async function createPost(data) {
  return await client
    .db("EntertainmentCritique")
    .collection("data")
    .insertOne(data);
}

export { genPassword, getUserByName, createUser, getAllPosts, createPost };
