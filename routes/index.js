const express 	= require("express"),
	router		= express.Router(),
	passport	= require("passport"),
	User 		= require("../models/user");

//the root route
router.get("/", (req, res) => {
	res.render("landing");
});

//===============
// Auth Routes
//===============

//shows the sign up form
router.get("/register", (req, res) => {
	res.render("register", {page: "register"});
});

//handles the sign up logic
router.post("/register", (req, res) => {
	let newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err)
			return res.render("register", {error: err.messgae});
		passport.authenticate("local")(req, res, () => {
		req.flash("success", "Account has been created " + user.username);
		res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login", (req, res) => {
	res.render("login", {page: "login"});
});

//handles login
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}));

//logout route
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});

module.exports = router;