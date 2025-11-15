import express from "express";
import morgan from "morgan";
import routes from "../src/api/v1/routes";

const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

// Connect API routes
app.use("/api/v1", routes);

export default app;
