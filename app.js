const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const connectDB = require("./database");
const userRoute = require("./Routes/userRoutes");
const taskRoute = require("./Routes/taskRoutes");
const notFound = require("./ErrorHandlers/404");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use("/user", userRoute);
app.use("/task", taskRoute);

app.use(notFound);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log("connected"));
};
start();
