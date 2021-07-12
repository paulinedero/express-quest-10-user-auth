const authRouter = require('express').Router();
const authentication = require('../models/auth.model');

authRouter.post('/checkcredentials', (req, res) => {
  const { email, password } = req.body;
  authentication
    .checkCredentials(email).then((user) => {
      if(!user) {
        res.status(401).send('Invalid credentials');
      } else {
        authentication.verifyPassword(password, authentication.hashedPassword).then(
          (passwordIsCorrect) => {
            if (passwordIsCorrect) {
              res.status(200).send('You are logged in')
            } else {
              res.status(401).send('Invalid credentials');
            }
          }
        );
      }
    })  
});

module.exports = authRouter;