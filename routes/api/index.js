const router = require("express").Router();
const User = require("../../models/User");
const words = require("./words");

// Book routes
// router.use("/words", words);



router.get("/users", (req,res) => {
    User.find().sort({score:-1}).then((dbUsers, err) => {
        if(err) {
            console.log('Error: ' + err);
            res.status(500).send('Error');
        } else {
            res.status(200).json(dbUsers);
        }
    })
})


// test NEW USER
router.post('/new', (req, res) => {
    User.create({
        username: req.body.username,
        score: req.body.score
    }, (err, dbUser) => {
        if (err) {
            console.log('CREATE Error: ' + err);
            res.status(500).send('Error');
        } else {
            res.status(200).json(dbUser);
        }
    });
});

// test DELETE USER
router.route('/:id')
    .delete((req, res) => {
        User.findById(req.params.id, (err, dbUser) => {
          if (err) { 
            console.log('DELETE Error: ' + err);
            res.status(500).send('Error');
          } else if (dbUser) {
            dbUser.remove( () => {
              res.status(200).json(dbUser);
            });
         } else {
            res.status(404).send('Not found');
          }
        });
    })
    .put((req, res) => {
        User.updateOne({_id : req.params.id}, {$inc: {score: req.body.deduct}}, (err, dbUser) => {
          if (err) { 
            console.log('CHANGE USER Error: ' + err);
            res.status(500).send('Error');
          } else if (dbUser) {
              res.status(200).json(dbUser);
         } else {
            res.status(404).send('Not found');
          }
        });
    });


module.exports = router;
