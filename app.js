const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
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
app.use(
  cors({
    origin: "http://localhost:1111",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to my server, bitches</h1>");
});
app.use("/user", userRoute);
app.use("/task", taskRoute);

app.use(notFound);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log("connected"));
};
start();
