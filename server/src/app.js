const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const issueRoutes = require("./routes/issue.routes");
const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
    });
});

app.use("/api/issues", issueRoutes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;