const express = require('express');
const User = require('../Models/UserModel');
const authRouter = express.Router();

authRouter.post('/api/auth/login', async (req, res) => {
    const user = (await User.findBy("name", req.body.username))[0];
    if (!user) {
        console.log("user not found");
        return res.status(404).json({ message: 'User not found' });
    }
    if (user.password != req.body.password) {
        console.log("password incorrect");
        return res.status(404).json({ message: 'Password incorrect' });
    }
    req.session.user = user;
    res.json({ user });
});

authRouter.get('/api/auth/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  User.get(req.session.user.id)
    .then(user => res.json({ user }))
    .catch(err => res.status(500).json({ message: err.message }));
});


module.exports = authRouter;