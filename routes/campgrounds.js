let express 	= require("express"),
	router		= express.Router(),
	Campground 	= require("../models/campground"),
	Comment		= require("../models/comment"),
	middleware	= require("../middleware");
//Index route - show all campgrounds
router.get("/", function(req, res){	
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
		}
	});
});

//Create - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
	// Create a new campground and save to DB
	let name = req.body.name;
	let price = req.body.price;
	let image = req.body.image;
	let desc = req.body.description;
	let author  = {
		id: req.user._id,
		username: req.user.username
	}
	let newCampground = {name: name, price: price, image: image, description: desc, author: author}
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

//New - shows form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found");
			res.redirect("back");
		} else {
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
		Campground.findById(req.params.id, function(err, foundCampground){
					res.render("campgrounds/edit", {campground: foundCampground});
	});
});
// Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err)
			res.redirect("/campgrounds");
		else //redirect somewhere(show page)
			res.redirect("/campgrounds/" + req.params.id);
	});
});

// Destroy Campground route

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, campgroundRemoved){
		if(err)
			res.redirect("/campgrounds");
		Comment.deleteMany({_id: {$in: campgroundRemoved.comments}}, function(err){
			if(err) {
				res.redirect("/campgrounds");
			}
			req.flash("success", "Successfully deleted campground");
			res.redirect("/campgrounds");
		});
	});
});


module.exports = router;