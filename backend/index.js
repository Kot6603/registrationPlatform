import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// const requestLogger = (req, _, next) => {
//   console.log("Method:", req.method);
//   console.log("Path:  ", req.path);
//   console.log("Body:  ", req.body);
//   console.log("---");
//   next();
// };
//
// app.use(requestLogger);

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
