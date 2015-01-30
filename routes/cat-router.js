var faker = require('Faker');
var colors = ['violet', 'coral', 'cerise', 'wheat', 'red', 'blue', 'green'];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getRandomColors() {
	shuffle(colors);

	var chosenColorQueue = Math.ceil(Math.random() * 3);
	return colors.slice(0, chosenColorQueue);
}

function getRandomImage() {
	var chosenImage = Math.ceil(Math.random() * 10);
	return "http://lorempixel.com/output/cats-q-c-200-200-" + chosenImage + ".jpg";
}

// Models.
var Cat = require('../models/cat');
module.exports = {
	
	newCat: function (req, res) {
		var randomAge = Math.round(Math.random() * 14) + 1;
		var randomName = faker.Name.firstName();
		var randomColors = getRandomColors();
		var randomImage = getRandomImage();

		var cat = new Cat({
			age: randomAge,
			name: randomName,
			colors: randomColors,
			image: randomImage
		});

		cat.save(function (err) {
		  if (err) {
		    console.log("Problem saving bob", err);
		  }
		});

		randomColors = randomColors.join(", ");

		// res.send("Time to make a new cat!");
		res.render("new_cat", {
			heading_text: "Congratulations! " + randomName + "!",
			cat_name: randomName,
			cat_age: randomAge,
			cat_image: randomImage,
			cat_colors: randomColors
		});
	},

	listCatByAge: function (req, res) {

		Cat.find()
			.sort({age: 1})
		  .exec(function(err, cats) {
				res.render("cats", {
					heading_text: "All the kitties!",
					colors: colors,
					cats: cats});
		  });
	},

	listCatByAgeColor: function (req, res) {
		var chosenColor = req.params.color;
		console.log(chosenColor);

		Cat.find({colors: chosenColor})
			.sort({age: 1})
		  .exec(function(err, cats) {
		  	res.render("cats", {
					heading_text: "All the <b style='font-size: 48px;'>" + chosenColor + "</b> kitties!",
					colors: colors,
					cats: cats});
		  });
	},

	moveCatToFarm: function (req, res) {

		Cat.find()
			.sort({age: -1})
		  .exec(function(err, cats) {
		  	res.render("bye_cat", {
					heading_text: "Bye, " + cats[0].name + "!",
					cat_name: cats[0].name,
					cat_age: cats[0].age,
					cat_image: cats[0].image,
					cat_colors: cats[0].colors
				});
		  	
		  	cats[0].remove();
		});
	},
}