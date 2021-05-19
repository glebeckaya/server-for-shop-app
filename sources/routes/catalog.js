const bodyParser = require("body-parser");
const {Router} = require("express");
const mongoose = require("mongoose");

const router = Router();
const Schema = mongoose.Schema;
const urlencodedParser = bodyParser.urlencoded({extended: false});

const schemeProducts = new Schema({
	id: {
		type: String
	},
	name: {
		type: String
	},
	price: {
		type: Number
	},
	image: {
		type: String
	},
	count: {
		type: Number
	},
	rating: {
		type: Number
	},
	stared: {
		type: Boolean
	}
});

const Products = mongoose.model("shopCollection", schemeProducts, "shopCollection");

router.get("/catalog", (req, res) => {
	Products.find({}, (err, data) => {
		res.send(data);
		if (err) console.log(err);
	});
});

router.put("/catalog/:id", urlencodedParser, (req) => {
	const _id = req.body._id;
	const productName = req.body.name;
	const productPrice = req.body.price;
	const productImage = req.body.image;
	const productCount = req.body.count;
	const productRating = req.body.rating;
	const productStared = req.body.stared;
	Products.findById(_id).then((product) => {
		product.name = productName;
		product.price = productPrice;
		product.image = productImage;
		product.count = productCount;
		product.rating = productRating;
		product.stared = productStared;
		product.save();
	});
});

module.exports = router;
