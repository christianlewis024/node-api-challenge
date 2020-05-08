const express = require("express");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();
// get all actions
router.get("/", (req, res) => {
  Actions.get().then((actions) => {
    res.status(200).json(actions);
  });
});

// post new action

router.post("/", (req, res) => {
  const data = req.body;
  if (!data.project_id || !data.description || !data.notes) {
    res
      .status(400)
      .json({ message: "400 - missing project id and description" });
  } else {
    Actions.insert(data).then((action) => {
      res.status(200).json(action);
    });
  }
});

// delete action

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Actions.remove(id).then(() => res.status(200).json({ message: "deleted" }));
});

// update  / put
router.put("/:id", (req, res) => {
  const data = req.body;
  const id = req.params.id;
  if (!data.project_id || !data.description || !data.notes) {
    res
      .status(400)
      .json({ message: "required fields: project id, description, and notes" });
  } else {
    Actions.update(id, data).then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(400).json({ message: "400" });
      }
    });
  }
});

module.exports = router;
