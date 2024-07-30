const express = require("express");
const router = express.Router();
const users = require("../data/users");

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", (req, res) => {
  if (req.body.name && req.body.username && req.body.email) {
    if (users.find((u) => u.username === req.body.username)) {
      res.json({ error: "Username already taken" });
    } else {
      const newUser = {
        id: users.length + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
      };
      users.push(newUser);
      res.json(newUser);
    }
  } else {
    res.json({ error: "Insufficient Data" });
  }
});

router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
});

router.patch("/:id", (req, res) => {
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      for (const key in req.body) {
        users[i][key] = req.body[key];
      }
      return true;
    }
  });
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
});

router.delete("/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id == req.params.id);
  if (userIndex > -1) {
    users.splice(userIndex, 1);
    res.json({ success: "User deleted" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = router;