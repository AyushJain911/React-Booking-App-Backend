import express from "express";
import dotenv from "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRotuer from "./routes/authRouter.js";
import hotelRouter from "./routes/hotelRouter.js";
import roomsRouter from "./routes/roomsRouter.js";
import usersRouter from "./routes/usersRouter.js";

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRotuer);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomsRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went Wrong";
  console.log(req.path, req.method);

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
  next();
});

// Database Connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
});
