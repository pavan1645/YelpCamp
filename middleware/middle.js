var Campground =			require("../modules/campground");
var Comment = 				require("../modules/comment");

var middlewareObj = {};

middlewareObj.isOwner = function (req,res,next){
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err,comment){
			if (err) {
				res.redirect("back");
			} else {
				if (comment.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function (req,res,next) {
	if (req.isAuthenticated()) return next();
	req.flash("error","Log In First!");
	res.redirect("/login");
}


module.exports = middlewareObj;