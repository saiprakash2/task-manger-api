import mongoose from "mongoose";
import _ from "lodash";

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        minlength: 1,
        trim:true,
        unique: true
    },
    passwords : {
        type: String,
        required:true,
        minlength: 0  
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean,
        default: true
    }
});

// //Instance methods
// UserSchema.methods.toJSON = function() {
//     const user = this;
//     const userObject = user.toObject();

//     //return the document except the password and sessions (these shouldn't made available)
//     return _.omit(userObject, ['passwords', 'sessions']);
// }

// UserSchema.methods.generateAccessAuthToken = function() { 
//     const user = this;
//     console.log('User created');
//     return new Promise((resolve, reject) => {
//         console.log('User created');
//         // create the json web token and return that
//         jwt.sign({_id: user._id.toHexString() }, "jwtsecret" , {expiresIn: "15m"},(err,token) => {
//             if(!err) {
//                 resolve(token);
//             } else {
//                 //there is an error
//                 reject();
//             }
//         });
//     });
// }

// UserSchema.methods.generateRefreshAuthToken = function() {
//     //This methiod simply generates a 64byte hex string - it doesn't  save it  to the database. saveSessionToDatabase() does that;
//     return new Promise((resolve, reject)=> {
//         crypto.randomBytes(64, (err, buf)=>{
//             if(!err) {
//                 // no error
//                 let token = buf.toString('hex');

//                 return resolve(token);
//             }
//         });
//     });
// }

// UserSchema.methods.createSession = function() {
//     let user = this;
//     return user.generateRefreshAuthToken().then((refreshToken)=>{
//         return saveSessionToDatabase(user, refreshToken);
//     }).then((refreshToken)=>{
//         // saved to database successfully
//         // return the refresh token
//         return refreshToken;
//     }).catch((e)=>{
//         return Promise.reject("Failed to save session to database.\n" + e);
//     })
// }


// /* Model Methods (static methods) */
// UserSchema.statics.findByIdAndToken = function(_id,token) {

//     const User = this;

//     return User.findOne({
//         '_id': _id,
//         'sessions.token': token
//     })
// }

// UserSchema.statics.findByCredentials = function(email, password) {
//     let User = this;
//     return User.findOne({
//         email: email
//     }).then((user) => {
//         if(!user) return Promise.reject();

//         return new Promise((resolve, reject) => { 
//             bcrypt.compare(password, user.passwords, (err, res) => {
//                 if(res) {
//                     resolve(user)
//                 }
//                 else {
//                     reject(err); 
//                 }
//             })
//         });
//     })
// }

// UserSchema.statics.hasRefreshTokenExpired = function(expiresAt) {
//     let secondsSinceEpoch = Date.now() /1000 ; 
//     if(expiresAt > secondsSinceEpoch) {
//         //hasn't expired
//         return false;
//     } else {
//         //has expired
//         return true;
//     }
// }

// /* Middelwawre */
// //Before user is saved this code runs
// UserSchema.pre('save', function(next) {
//     let user = this;
//     let costFactor = 10;

//     if(user.isModified('passwords')) {
//         // if password is changed then run this code

//         //Generate salt and hash password
//         bcrypt.genSalt(costFactor, (err,salt) => {
//             bcrypt.hash(user.passwords, salt, (err,hash) => {
//                 user.passwords = hash;
//                 next();
//             })
//         });
//     } else {
//         next();
//     }
// })




/* Helper Methods */
// let saveSessionToDatabase = (user, refreshToken) =>{
//     //save session to database
//     return new Promise((resolve, reject)=>{
//         let expiresAt = generateRefreshTokenExpiryTime();
//         user.sessions.push({'token': refreshToken, 'expiresAt': expiresAt});
//         user.save().then(() =>{
//             return resolve(refreshToken);
//         }).catch((e)=> {
//             reject(e);
//         });
//     })
// }

// let generateRefreshTokenExpiryTime = ()=>{
//     let dayUntilExpire = 10;
//     let secondUntilExpire = ((dayUntilExpire * 24)*60) * 60;
//     return ((Date.now() / 1000) + secondUntilExpire);
// }

export const User = mongoose.model('User', UserSchema);