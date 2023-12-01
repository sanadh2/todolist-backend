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
const corsOptions = {
  origin: [
    "https://todolist-frontend-mine.vercel.app",
    "http://localhost:1111",
    "http://192.168.1.11:1111",
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

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
