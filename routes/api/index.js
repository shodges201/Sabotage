const router = require("express").Router();
const db = require("../../models");
// const words = require("./words");
const bcrypt = require("bcrypt-nodejs");
const passport = require("../../config/passport");

// Book routes
// router.use("/words", words);



router.get("/users", (req,res) => {
    db.User.find().sort({score:-1}).then((dbUsers, err) => {
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
  let password =  bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
    db.User.create({
        username: req.body.username,
        password: password,
        score: req.body.score
    }, (err, dbUser) => {
        if (err) {
            console.log('CREATE Error: ' + err);
            res.status(500).send('Error');
        }
        else{
          res.redirect("/login");
        }
    });
    
});

router.post('/login', passport.authenticate("local"), (req,res) => {
  console.log('tried to login');
  console.log(req.user);
  res.json(req.user);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.put('/score', (req, res) => {
    //console.log(req);
    console.log(req.user);
    db.User.updateOne({_id : req.user._id}, {$inc: {score: req.body.deduct}}, (err, dbUser) => {
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

// test DELETE USER
router.route('/:id')
    .delete((req, res) => {
        db.User.findById(req.params.id, (err, dbUser) => {
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


module.exports = router;
