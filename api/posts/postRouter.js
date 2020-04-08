const express = require("express");
const Posts = require("../../data/db.js")
const router = express.Router();

//get all posts WORKS(changed limit from 2 to 10)
router.get("/", (req, res)=> {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    })
})

//get one post WORKS
router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "The post information could not be retrieved."
        });
      });
  });

//get comments by post id WORKS
router.get("/:id/comments", (req, res) => {
    const postId = req.params.id;
    Posts.findPostComments(postId)
      .then(post => {
        if (!postId) {
          return res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
        } else {
          res.status(200).json(post);
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "The comments information could not be retrieved." });
      });
    
  });

  //create a new post WORKS
router.post("/", (req, res) => {
    if(!req.body.title || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
        } else{
            Posts.insert(req.body)

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
        }
});

//create a new comment by post id WORKS
router.post("/:id/comments", (req, res) => {
    if(!req.body.post_id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    if(!req.body.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment."})
    }
  Posts.insertComment(req.body)
    .then(comment => {
        Posts.findPostComments(req.body.post_id)
        .then(post => {
        res.status(201).json(post);})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

//delete one post WORKS
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
        console.log(error);
        res.status(500).json({
          error: "The post could not be removed"
        });
      });
  });

  //edit one post WORKS
  router.put("/:id", (req, res) => {
    Posts.update(req.params.id, req.body)
      .then(post => {
        if (post) {
          Posts.findById(req.params.id)
          .then(post=> res.status(200).json(post));
        } else {
          res.status(404).json({ 
              message: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "The post information could not be modified.",
        });
      });
  });

module.exports = router;