import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";

const app = express();
const CONNECTION_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3306;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", userRouter);

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error(error);
  });
