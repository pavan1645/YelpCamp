var express = require("express");
var router = express.Router();

var Campground =			require("../modules/campground");
var Comment = 				require("../modules/comment");
var middleware = require("../middleware/middle");

router.post("/campgrounds/:id",middleware.isLoggedIn,function(req,res){
	//Add new post and associate it with the campground :)
	Comment.create({
		text: req.body.comment,
		author: {
			id: req.user._id,
			username: req.user.username
		}
	},function(err,comment){
		if (err) {
			console.log(err);
		} else {
			Campground.findById(req.params.id,function(err,campground){
				campground.comments.push(comment);
				campground.save();
				req.flash("success","Comment posted");
				console.log("New comment added");
				console.log(comment);
				res.redirect("/campgrounds/"+req.params.id);
			});
		}
	});
});

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.isOwner,function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,cg){
		if (err) {
			console.log(err);
		} else {
			Comment.findById(req.params.comment_id,function(err,comment){
				res.render("show_edit",{cg:cg,comment:comment,comment_id:req.params.comment_id});
			});
		}
	});
});

router.put("/campgrounds/:id/comments/:comment_id",middleware.isOwner,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, {$set:{text: req.body.editBox}}, {new: true}, function(err,updatedComment){
		if (err) {
			console.log(err);
		} else {
			console.log(updatedComment);
			req.flash("warning","Comment edited");
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
});

router.delete("/campgrounds/:id/comments/:comment_id",middleware.isOwner,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err,comment){
		if (err) {
			console.log(err);
		} else {
			console.log("deleted");
			req.flash("error","Comment deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

module.exports = router;