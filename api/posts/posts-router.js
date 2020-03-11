const express = require("express");

const Posts = require("./posts-model.js");

const router = express.Router();


//GET api/posts ALL POSTS
router.get("/", (req, res) => {
  posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

//GET api/posts/id SINGLE POST
router.get("/:id", (req, res) => {
  posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved."
      });
    });
});

//GET api/posts/id/comments COMMENTS BY POST
router.get("/:id/comments", (req, res) => {
    posts.findById(req.params.id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ 
              message: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
            error: "The comments information could not be retrieved."        });
      });
  });


// POST api.posts NEW POST
router.post("/", (req, res) => {
    if(!req.body.title && !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
    }
  posts.add(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

//POST api/id/comments NEW COMMENT
router.post("/:id/comments", (req, res) => {
    if(!req.body.id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    if(!req.body.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment."})
    }
  posts.add(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

// DELETE /api/posts/id ONE POST
router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The post has been nuked" });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
});

//PUT api/posts/id CHANGE A SINGLE POST
router.put("/:id", (req, res) => {
  posts.update(req.params.id, req.body)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ 
            message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified.",
      });
    });
});



module.exports = router;
