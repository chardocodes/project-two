const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const states = require("./states.js")

module.exports = app => {
  // Load signup page
  app.get("/", (req, res) => res.render("dogwalkers"));
  app.get("/signup", (req, res) => res.render("signup", {
    states: states,
  }));
  
  // app.get("/login", (req, res) => res.render("login"));

  // Load profile page
  app.get("/profile", (req, res) => {
    db.User.findAll().then(dbAllUsers => {
    
      res.render("profile", { users : dbAllUsers });
    });
  });
  app.get("/login", (req, res) => res.render("login"));
  // Load example page and pass in an example by id

  app.get("/update", (req, res) => {
    let currentUser = req.user
    
  
  
  
  
  res.render("update", {
    user: currentUser
  })});

  

  app.get("/example/:id", (req, res) => {
    db.User.findOne({ where: { id: req.params.id } }).then(dbExample => {
      res.render("example", {
        users: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => res.render("404"));
};
