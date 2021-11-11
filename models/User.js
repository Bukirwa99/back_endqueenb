const mongoose = require('mongoose');
const uuid = require('uuid');
const { isEmail } = require('validator');
const { hash, compare } = require('bcryptjs');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: [isEmail, 'Please enter valid email'],
        unique: true,
        lowercase: true
    },
    type: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
});

// Hash password
userSchema.pre('save', async function(next) {
    this.password = await hash(this.password, 10);
    next();
});

// Static method to login users
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });

    if (user) {
        const auth = await compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

// Static method to fetch users
userSchema.statics.fetch_users = async function(email) {
    const user = await this.findOne({ email });

    if (user) {
        return user;
    }
    throw Error('Incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;