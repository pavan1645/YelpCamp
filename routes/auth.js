var express = 	require("express");
var router = 	express.Router();
var	passport = 	require("passport");
var User =		require("../modules/user");
var middleware = require("../middleware/middle");

router.get("/",function(req,res){
	res.render("index");
});

//AUTH ROUTES
router.get("/register",function(req,res) {
	res.render("register");
});

router.post("/register",function(req,res){
	User.register({username: req.body.username}, req.body.password, function(err,user){
		if (err) {
			console.log(err);
			req.flash("error",err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(err,user){
			console.log(user);
			req.flash("success","Registered succesfully!");
			res.redirect("campgrounds");
		});
	});
});

router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login",passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}),function(req,res){
	req.flash("success","Logged in succesfully!");	
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged out succesfully!");
	res.redirect("login");
});

module.exports = router;