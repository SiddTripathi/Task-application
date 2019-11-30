const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwtoken = require('jsonwebtoken')


//converting user object into schema so that middleware function can be aded. Although mongoose converts a object in schema automatically
//but to introduce middleware, we need to convert it to schema first.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('This email is not valid')
            }

        }

    },
    age: {
        type: Number,
        trim: true,
        default: 18,
        validate(value) {
            if (value < 18) {
                throw new Error('Age must be above 18')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password cannot be password')
            }
        }

    },
    tokens: [{
        token: {
            required: true,
            type: String
        }
    }]
})

//function to generate web tokens for each user. Now here we user .methods instead of .statics because statics is called
//for entire model whereas methods are called at particular instances. Here for each user(instance) it is called. 
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwtoken.sign({ _id: user._id.toString() }, 'thisisanothercourse')//generating the tokens using Ids of users

    user.tokens = user.tokens.concat({ token }) //concating the tokens added upon each request. 
    await user.save()
    return token


}

//function to verify credentials
userSchema.statics.findByCredential = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new error('Unable to login')
    }
    const isMatchPassword = await bcrypt.compare(password, user.password)
    if (!isMatchPassword) {
        throw new error('Unable to login')
    }
    return user
}



//middleware function
//'this' is used to access user documents.
//'next' is used to end the function so that machine can know that now user can be saved
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {

        user.password = await bcrypt.hash(user.password, 8)

    }

    next()
})





//Using schema to create/update model

const User = mongoose.model('User', userSchema)

module.exports = User