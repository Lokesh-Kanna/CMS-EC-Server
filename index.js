import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { userRouter } from "./routes/users.js";
import { postRouter } from "./routes/posts.js";
import { auth } from "./middleware/auth.js";

dotenv.config();

const PORT = process.env.PORT || 9000;
const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;

// Creating connection with MongoDB Atlas Server
export async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB is connected");
  return client;
}
const client = await createConnection();

app.get("/", auth, (req, res) => {
  res.send("I'm Running well Lokesh! :)");
});

app.use("/users", userRouter);

app.use("/posts", postRouter);

app.listen(PORT, () => console.log("Server running in port", PORT));

export { client };
