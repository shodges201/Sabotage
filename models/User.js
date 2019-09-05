const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    }
})


const User = mongoose.model("User", userSchema);

// Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};



// userSchema.pre("save", function (user) {
//     // console.log('before create');
//     // user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
//     // console.log(user.password);
//     if (!this.isModified("password")) {
//         return next();
//     }
//     this.password = bcrypt.hashSync(this.password, 10);
//     next();
// });

module.exports = User;
