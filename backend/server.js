const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({path:"./config/config.env"})

//Handling uncaught Exception
process.on("uncaughtException", (err) => {
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

// calling database
const server = app.listen(5001, () =>
  console.log(`server runing on port ${process.env.PORT}`)
);

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
