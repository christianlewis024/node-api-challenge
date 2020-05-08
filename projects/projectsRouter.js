const express = require("express");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

// get requests first:

router.get("/", (req, res) => {
  Projects.get()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({ message: "500 server error" });
    });
});

module.exports = router;
