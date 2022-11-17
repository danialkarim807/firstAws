const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') })


const userSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error ("Email is invalid!")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    userRole: {
        type: String,
        required: true,
        validate(value) {
            if(value != "patient" && value != "therapist") {
                throw new Error ("Role not available")
            }
        }
    },
    userId: {
        type: String,
        unique: true,
        immutable: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//Search user by email and password for login.
userSchema.statics.findByCredentials = async (email, password) => {
    const targetUser = await User.findOne({email})

    //Search for user.
    if (!targetUser) {
        throw new Error('Incorrect login email and/or password given. Please try again...')
    }
    else {
        const isMatch = await bcrypt.compare(password, targetUser.password)
        //Comparing passwords.
        if (!isMatch) {
            throw new Error('Incorrect login email and/or password given. Please try again...')
        }
        else {
            return(targetUser)
        }
    }
}

//Generate userId for a new user.
userSchema.methods.generateUserId = async function() {
    const last_user = await User.find().sort({createdAt: -1}).limit(1)
    //If its the first user
    if (!last_user.length) {
        this.userId = 'user_1'
    } else {
        this.userId = `user_${(parseInt(last_user[0].userId.split("_")[1]) + 1)}` 
    }  
}

//Generate jwt token for auth.
userSchema.methods.generateAuthToken = async function () {
    //First delete all expired tokens.
    for(old_token of this.tokens) {
        //Will throw an error if the jwt is expired and delete it.
        try {
            const decoded = jwt.verify(old_token.token, process.env.JWT_SECRET)
            console.log("valid")
        } catch (e) {
            this.tokens.splice(this.tokens.indexOf(old_token),1)
            console.log("expired")
        }
    }
    //Remove old tokens even if they are not expired.
    if(this.tokens.length >= 3) {
        this.tokens.splice(0, 1)
    }
    const token = jwt.sign({ _id: this.userId}, process.env.JWT_SECRET, {expiresIn: '12h'})
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

//Hash the password and change updatedAt at any update of the user.
userSchema.pre('save', async function(next) {
    this.set({ updatedAt: new Date() });
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User
