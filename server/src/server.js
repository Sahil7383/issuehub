const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "../../.env");

console.log("Looking for .env at:", envPath);

dotenv.config({
    path: envPath,
});

console.log("MONGO_URI:", process.env.MONGO_URI);
const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const connectDatabase = require("./config/db");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const startServer = async () => {
    try {
        await connectDatabase();

        server.listen(PORT, () => {
            console.log(`IssueHub API running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server");
        process.exit(1);
    }
};

const gracefulShutdown = async (signal) => {
    console.log(`${signal} received. Starting graceful shutdown...`);

    server.close(async () => {
        console.log("HTTP server closed");

        await mongoose.connection.close();

        console.log("MongoDB connection closed");

        process.exit(0);
    });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

startServer();