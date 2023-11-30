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
    origin: "https://todolist-frontend-mine.vercel.app", // Update this to match your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Set to true if your frontend sends credentials (e.g., cookies)
  })
);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1 style='text-align:center;'>Welcome to my server, bitches</h1>");
});
app.use("/user", userRoute);
app.use("/task", taskRoute);

app.use(notFound);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log("connected"));
};
start();
