const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Handling errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { username: '', email: '', password: '', movieId: '', movieTitle: '', review: '', rating: '', movieId: '' };

    // Incorrect email
    if (err.message === 'Incorrect email') {
        errors.email = "User not found";
    }

    //Incorrect password
    if (err.message === 'Incorrect password') {
        errors.password = 'Password is incorrect';
    }

    // no review found
    if (err.message === 'Review not found') {
        errors.movieId = 'Movie Id not found';
        errors.movieTitle = 'Movie title not found';
        errors.review = 'Review not found';
    }

    //Duplicate error code
    if (err.code === 11000) {
        errors.email = 'User already exists';
        return errors;
    }

    // validating user errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// Creating tokens
const maxAge = 2 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'queen bee website auth token', { expiresIn: maxAge });
}

module.exports.login_post = async(req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);
        res.cookie('queenBee_JWT', token, { httpOnly: true, maxAge: maxAge * 1000 });

        res.status(200).json({ user });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.register_post = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        res.status(200).json({ user });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}