const router = require("express").Router();
const fs = require("fs");

// Matches with "/api/words"
router.route("/")
    .get(function (req, res) {
        console.log('get words');
        let rand = Math.floor((Math.random() * 235836) + 1);
        fs.readFile(__dirname + '/../../client/public/words.txt', 'utf8', function(err, data){
            if(err) throw err;
            console.log(data);
            res.send(data);
        });
    });

module.exports = router;
