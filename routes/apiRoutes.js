const db = require("../models");
const passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const currentUser = {
  username: "",
  password: ""
};
module.exports = app => {
  // Get all examples
  app.get("/api/examples", (req, res) => {
    db.Example.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(dbExamples => {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", (req, res) => {
    db.Example.create({
      UserId: req.user.id,
      text: req.body.text,
      description: req.body.description
    }).then(dbExample => {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  
  app.get("/api/update", (req, res) => {
    // console.log(currentUser);

    // if(parseInt(req.params.id) === req.user.id){
      console.log("HERE!!!!!!");
      db.User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        phone: req.body.phone,
        rate: req.body.rate,
        password: req.body.password,
        imageUrl: req.body.imageUrl
        
      },
      {
        where: {
          id: req.user.id
        }
      }).then(dbExample => {
        
        res.json(dbExample);
      });
        
    //  else{
    //   res.json({message: "didnt get anything"})
    // }
    
   
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    console.log(req.user)
    // db.User.findOne({
    //   where: {
    //     UserId: req.user.id
    //   }}).then(dbExample => {
    //     currentUser = dbExample
    //   });
    currentUser.user = req.user;
    // currentUser.password = req.body.password;
    // currentUser.email = req.body.email;
    res.json("/profile");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      phone: req.body.phone,
      rate: req.body.rate,
      password: req.body.password,
      imageUrl: req.body.imageUrl
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
