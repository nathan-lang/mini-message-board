const express = require("express");
const app = express();

// Lets our app know that we intend to use EJS as a template engine, as well as where to look for view files.
// This enables EJS as the view engine, and that our app should look for templates in the /views subdirectory.
const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Listening...");
});

const now = new Date();
const monthAndDay = now.toLocaleString("en-us", {
  month: "short",
  day: "numeric",
});
const hours = now.getHours();
const minutes = now.getMinutes();
const timeString = `${monthAndDay} ${hours
  .toString()
  .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: timeString,
    timeDetails: now,
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: timeString,
    timeDetails: now,
  },
];

app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/new", (req, res) => {
  res.render("form");
});

// Serving the static CSS file
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.post("/new", (req, res) => {
  const data = req.body.messageText;

  console.log("Received data:", data);

  const now = new Date();
  const monthAndDay = now.toLocaleString("en-us", {
    month: "short",
    day: "numeric",
  });
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const timeString = `${monthAndDay} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  messages.push({
    text: req.body.messageText,
    user: "Me",
    added: timeString,
    timeDetails: now,
  });

  res.redirect("/"); // redirects the user back to the index page after sending a message.
});

app.get("/details", (req, res) => {
  const name = req.query.user;
  const date = req.query.timeDetails;
  console.log(name, date);
  res.render("details", { name, date });
});
