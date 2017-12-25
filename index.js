var bodyParser =			require("body-parser");
var express = 				require("express");
var app =					express();
var mongoose =				require("mongoose");
var	passport =				require("passport");
var LocalStrategy = 		require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var expressSession =		require("express-session");
var methodOverride = 		require("method-override");
var flash = 				require("connect-flash");

var User = 					require("./modules/user");
var Campground =			require("./modules/campground");
var seedDB = 				require("./seeds");
var Comment = 				require("./modules/comment");

var commentRoutes = 		require("./routes/comments");
var campgroundRoutes = 		require("./routes/campgrounds");
var authRoutes =	 		require("./routes/auth");

/*DB Config*/
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", { useMongoClient: true }).catch(err => { // we will not be here...
	console.error('App starting error:', err.stack);
	process.exit(1);
});
mongoose.connection.on('connected', function(){console.log("connected to db")});
/*Body and Files Config*/
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
/*Passport Config*/
app.use((expressSession)({
	secret: "I love gaming",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride("_method"));

app.use(flash());

app.use(function(req,res,next){
	res.locals.user = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.warning = req.flash("warning");
	next();
});

app.use(authRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(3000,function() {
	console.log("Serving on port 3000");
})