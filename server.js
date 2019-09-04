const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const api = require('./routes/api');
const Pusher = require('pusher');
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Pusher module used to set up live mongoDB listen
const pusher = new Pusher({
  appId: '855391',
  key: 'b2809c73fbc28accc074',
  secret: '65ea3c21e522a4fc45a7',
  cluster: 'us2',
  encrypted: true,
});
const channel = 'users';



app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/api', api);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pointless", { useNewUrlParser: true });
mongoose.connect('mongodb://localhost/saboDB?replicaSet=rs');


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {
  app.listen(9000, () => {
    console.log('Node server running on port '+9000);
  });

  const userCollection = db.collection('users');
  const changeStream = userCollection.watch();

  userCollection.find({}, (err,data) => {
    console.log(data)
  })

  // changeStream.on("load")

  changeStream.on('change', (change) => {
    console.log(change);

    if (change.operationType === 'insert') {
      const user = change.fullDocument;
      pusher.trigger(
        channel,
        'inserted', {
          id: user._id,
          username: user.username,
          score: user.score
        }
      );
    } else if (change.operationType === 'delete') {
      pusher.trigger(
        channel,
        'deleted',
        change.documentKey._id
      );
    }
  });
});



// // // Start the API server
// app.listen(PORT, function() {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });
