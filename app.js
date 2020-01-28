let express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	Campground 		= require("./models/campground"),
	Comment			= require("./models/comment"),
	seedDB 			= require("./seeds"),
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	User			= require("./models/user"),
	methodOverride 	= require("method-override"),
	flash			= require("connect-flash");

//requiring routes
let commentRoutes 		= require("./routes/comments"),
	campgroundRoutes 	= require("./routes/campgrounds"),
	indexRoutes			= require("./routes/index");

//-------------LocalDB----------------------------------
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASEURL);
//-------------LocalDB----------------------------------
console.log(process.env.DATABASEURL);
//-------------CloudDB----------------------------------
//mongoose.connect("mongodb+srv://admin:mongo1672284@cluster0-ptfoe.mongodb.net/test?retryWrites=true&w=majority");
//-------------CloudDB----------------------------------
app.use(methodOverride("_method"));
app.use(flash());
// mongoose.connect("mongodb://localhost/yelp_camp").then(function(){ //seed the database
// 	seedDB();
// });

// Passport Config
app.use(require("express-session")({
	secret: "I'm the best around no one is ever going to keep me down!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

let port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("Server started!!!");
});