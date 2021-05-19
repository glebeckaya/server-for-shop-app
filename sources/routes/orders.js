const bodyParser = require("body-parser");
const {Router} = require("express");
const mongoose = require("mongoose");

const router = Router();
const Schema = mongoose.Schema;
const urlencodedParser = bodyParser.urlencoded({extended: false});

const schemeOrders = new Schema({
	id: {
		type: String
	},
	user: {
		type: String
	},
	productId: {
		type: String
	},
	amount: {
		type: Number
	},
	address: {
		type: String
	},
	delivery: {
		type: String
	},
	payment: {
		type: String
	},
	date: {
		type: String
	},
	status: {
		type: String
	},
	customerName: {
		type: String
	},
	customerEmail: {
		type: String
	},
	customerPhone: {
		type: String
	}
});

const Orders = mongoose.model("ordersCollection", schemeOrders, "ordersCollection");

router.get("/orders", (req, res) => {
	Orders.find({}, (err, data) => {
		res.send(data);
		if (err) console.log(err);
	});
});

router.post("/orders", urlencodedParser, (req) => {
	const orderUser = req.body.user;
	const orderProduct = req.body.productId;
	const orderAmount = req.body.amount;
	const orderAddress = req.body.address;
	const orderDelivery = req.body.delivery;
	const orderPayment = req.body.payment;
	const orderDate = req.body.date;
	const orderStatus = req.body.status;
	const orderCustomerName = req.body.customerName;
	const orderCustomerEmail = req.body.customerEmail;
	const orderCustomerPhone = req.body.customerPhone;
	let order = new Orders({
		user: orderUser,
		productId: orderProduct,
		amount: orderAmount,
		address: orderAddress,
		delivery: orderDelivery,
		payment: orderPayment,
		date: orderDate,
		status: orderStatus,
		customerName: orderCustomerName,
		customerEmail: orderCustomerEmail,
		customerPhone: orderCustomerPhone
	});
	order.save();
});

module.exports = router;
