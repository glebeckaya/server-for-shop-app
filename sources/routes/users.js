const bodyParser = require("body-parser");
const {Router} = require("express");
const mongoose = require("mongoose");

const router = Router();
const Schema = mongoose.Schema;
const urlencodedParser = bodyParser.urlencoded({extended: false});

const schemeUsers = new Schema({
	id: {
		type: String
	},
	name: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	stars: {
		type: String
	},
	bag: {
		type: String
	}
});

const Users = mongoose.model("usersCollection", schemeUsers, "usersCollection");

router.get("/users", (req, res) => {
	Users.find({}, (err, data) => {
		res.send(data);
		if (err) console.log(err);
	});
});

router.post("/users", urlencodedParser, (req) => {
	const _id = req.body._id;
	const userName = req.body.name;
	const userEmail = req.body.email;
	const userPassword = req.body.password;
	const userStared = req.body.stars;
	const userBag = req.body.bag;
	Users.findById(_id).then((user) => {
		user.name = userName;
		user.email = userEmail;
		user.password = userPassword;
		user.stars = userStared;
		user.bag = userBag;
		user.save();
	});
});

module.exports = router;
