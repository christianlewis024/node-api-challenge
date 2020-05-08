const express = require("express");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

// get requests first:

/// get all projects

router.get("/", (req, res) => {
  Projects.get()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({ message: "500 server error" });
    });
});

// post a project

router.post("/", (req, res) => {
  const data = req.body;
  if (!data.name || !data.description) {
    res.status(400).json({ message: "400 - missing name and description" });
  } else {
    Projects.insert(data)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((err) => {
        res.status(500).json({ message: "500 - server error" });
      });
  }
});

// get certain post by post ID

router.get("/:id", (req, res) => {
  Projects.get(req.params.id).then((project) => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(400).json({ message: "400" });
    }
  });
});

// delete
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Projects.remove(id).then(() => res.status(200).json({ message: "deleted" }));
});

// put
router.put("/:id", (req, res) => {
  const data = req.body;
  const id = req.params.id;
  if (!data.name || !data.description) {
    res.status(400).json({ message: "needs name and description" });
  } else {
    Projects.update(id, data).then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(400).json({ message: "400 - id issue" });
      }
    });
  }
});

module.exports = router;
