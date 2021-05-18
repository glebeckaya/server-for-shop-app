const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const catalogRoutes = require("./routes/catalog");
const usersRoutes = require("./routes/users");

const app = express();

const corsOptions = {
	origin: "http://localhost:8080",
	optionsSuccessStatus: 200
};

app.use(express.static(`${__dirname}/public`));
app.use(cors(corsOptions));
app.use(catalogRoutes);
app.use(usersRoutes);

const port = 3000;

async function start() {
	try {
		await mongoose.connect("mongodb+srv://shopUser:ShopUser12345@cluster0.14rpb.mongodb.net/shopDB", {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false
		});
		app.listen(port, () => console.log(`We are live on ${port}`));
	}
	catch (error) {
		console.log(error);
	}
}

start();
