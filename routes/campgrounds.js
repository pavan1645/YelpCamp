var express = require("express");
var router = express.Router();
var middleware = require("../middleware/middle");

var Campground = require("../modules/campground");

router.get("/campgrounds",function(req,res){
	Campground.find({},function(err,cgs){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds",{cgs:cgs});		
		}
	});
});

router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
	//CREATE NEW CAMPGROUND AND SAVE
	Campground.create({
		name:req.body.name,image:req.body.image
	},function(err,cg){
		if (err) {
			console.log(err);
			res.redirect("back")
		} else {
			req.flash("success","Campground added successfully");
			console.log("New Campground Added");
			console.log(cg);
			res.redirect("/campgrounds");			
		}
	});
});

router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
	res.render("new");
});

router.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,cg){
		//console.log(cg);
		res.render("show",{cg:cg});
	});
});

module.exports = router;