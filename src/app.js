const express = require("express");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoutes");
const aiRoutes = require("./routes/aiRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/web/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

app.use("/web/api/notes", noteRoutes);
app.use("/web/api/ai", aiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
