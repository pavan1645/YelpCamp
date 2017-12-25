var mongoose =		require("mongoose");
var Campground =	require("./modules/campground");
var Comment = 		require("./modules/comment");

var data = [
	{
		name: "Panvel",
		image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
	},
	{
		name: "Matheran",
		image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"
	},
	{
		name: "SGNP",
		image: "https://c1.staticflickr.com/8/7144/6568306111_8e3cb5d2d0_b.jpg"
	},
	{
		name: "Gujrat",
		image: "https:////c1.staticflickr.com/6/5532/12009674985_4b0029f766_b.jpg"
	},
	{
		name: "Lonavala",
		image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"
	},
	{
		name: "Goa",
		image: "https:////c1.staticflickr.com/7/6204/6047319257_b27c1be597_n.jpg"
	}
];

function seedDB() {
	//Remove all Campgrounds
	Campground.remove({},function(err){
		if (err) {
			console.log(err);
		} else {
			console.log("All Campgrounds Removed");
			data.forEach(function(seed){
				Campground.create(seed,function(err, campground){
					if (err) {
						console.log(err);
					} else {
						console.log("Campground Added");
						//Create comment
						Comment.create({
							text: "This place is awesome",
							author: {
								id: "588b4189ece8a806b0414c39",
								username: "megatroll"
							}
						},function(err,comment){
							if (err) {
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
							}
						});
					}
				});
			})
		}
	})
}

module.exports = seedDB;