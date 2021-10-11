const express = require("express");
const checkMillionDollarIdea = require("./checkMillionDollarIdea.js");
const ideasRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db.js");

// ideasRouter.use(["/", "/:ideaId"], checkMillionDollarIdea);

ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    const idea = getFromDatabaseById('ideas', ideaId);
    if (idea) {
      next();
    } else {
      res.status(404).send();
    }
  });

ideasRouter.get("/", (req, res, next) => {
  const ideasArray = getAllFromDatabase("ideas");
  res.send(ideasArray);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  const idea = getFromDatabaseById("ideas", ideaId);
  if (idea) {
    res.json(idea);
  } else {
    res.status(404).send();
  }
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {

   
    const newIdea = addToDatabase("ideas", req.body);
    res.status(201).send(newIdea);

});

ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
  const ideaId = req.params.ideaId;
  const ideaToUpdate = getFromDatabaseById("ideas", ideaId);
  req.body.id = ideaToUpdate.id;
  const updatedIdea = updateInstanceInDatabase("ideas", req.body);
  res.send(updatedIdea);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const ideaId = req.params.ideaId;
  const ideaToDelete = deleteFromDatabasebyId("ideas", ideaId);
  if (ideaToDelete) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter;
