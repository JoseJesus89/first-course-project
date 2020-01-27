let mongoose 	= require("mongoose"),
	Campground 	= require("./models/campground"),
	Comment		= require("./models/comment");

let data = [
	{
		name: "Cloud's Rest",
		image: "https://img-aws.ehowcdn.com/560x560p/s3-us-west-1.amazonaws.com/contentlab.studiod/getty/22e90f1e1ef649469c07ad56ac992f56",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Desert Mesa",
		image: "https://i.ytimg.com/vi/MEhSZgDa7Vg/hqdefault.jpg",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Canyon Floor",
		image: "https://images.squarespace-cdn.com/content/v1/5755d7f022482e6896b3783e/1469839187962-CG55ZRHFA15RZKX8YJTN/ke17ZwdGBToddI8pDm48kNvT88LknE-				K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/image-asset.jpeg?format=1500w",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 	took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
	
]

function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
	if(err)
		console.log(err)
	else {
		console.log("removed campgrounds!");
		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err)
					console.log(err);
				else {
					console.log("added a campground");
					//create a comment
					Comment.create({
						text: "This place is great, but I wish there was internet",
						author: "Homer"
					}, function(err, comment){
						if(err)
							console.log(err)
						else {
							campground.comments.push(comment);
							campground.save();
							console.log("Create new comment");
						}
					});
				}	
			});
		});
	}
	});	
	//add a few comments
	
}

module.exports = seedDB;