const express = require('express');
const User = require('../Models/UserModel');
const userRouter = express.Router();

// middleware to send 401 error if user is not authenticated
userRouter.use((req ,res ,next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  return next();
})


// get the current session's user
userRouter.get('/api/user/', (req, res) => {
    User.get(req.session.user.id)
        .then(user => res.json({ user }))
        .catch(err => res.status(500).json({ message: err.message }));
});

// update user information
userRouter.put('/api/user/update', (req, res) => {
    const newUserData = req.body
    User.update(req.session.user.id, newUserData)
        .then(updateData => res.json({ updateData }))
        .catch(err => res.status(500).json({ message: err.message }));
});

// update user password
userRouter.put('/api/user/updatepassword', (req, res) => {
  // get inputs
  const { currentPassword, newPassword, confirmedNewPassword } = req.body;

  // check if current password is correct and if new password and confirmed new password are equal to eachother
  if (currentPassword !== req.session.user.password) res.status(400).send("Current password incorrect"); 
  if (newPassword !== confirmedNewPassword) res.status(400).send("New password and confirmed new password are different"); 

  // update
  User.update(req.session.user.id, { "password": newPassword })
    .then(updateData => res.json({ updateData }))
    .catch(err => res.status(500).json({ message: err.message }));
});

// disconnect user from session
userRouter.post("/api/user/endsession", (req,res) => {
    const { name } = req.session.user;
    req.session.destroy();
    res.send("The session of user "+name+" has been destroyed");
});



module.exports = userRouter;