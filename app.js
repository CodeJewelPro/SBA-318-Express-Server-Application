const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Set the view engine to  EJS
app.set("view engine", "ejs");

// Routes
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

// Logging middleware
app.use((req, res, next) => {
  const time = new Date();
  console.log('${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.');
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(JSON.stringify(req.body));
  }
  next();
});

// The main view rendered 
app.get("/", (req, res) => {
  res.render("index", { users: require("./data/users") });
});

// Error-handling middleware
app.use((req, res) => {
  res.status(404).json({ error: "Resource Not Found" });
});

app.listen(PORT, () => {
  console.log('Server is listening on port: ${PORT}');
});