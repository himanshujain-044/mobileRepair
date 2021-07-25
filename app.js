require("dotenv").config();
const express = require("express");
const { getData, newRepairData } = require("./controller/mobileRepair");
const app = express();
const mongoose = require("mongoose");
const mysql = require("mysql");

const ErrorClass = require("./services/error.js");

// const mongoUrl = process.env.MONGODB_URL_LOCAL;
// process.env.IS_DEV_ENV === 'true'
//     ? process.env.MONGODB_URL_DEV
//     : process.env.MONGODB_URL_DEMO;
const con = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	// port: "8889",
	password: "himanshu@123",
	insecureAuth: true,
	multipleStatements: true,
	database: "test",
});

con.connect(function (err) {
	if (err) {
		console.log(err);
		throw err;
		
	}
	console.log("Connected!");
});
app.listen(3000, () => {
	// mongoose
	// 	.connect(process.env.MONGODB_URL_LOCAL, {
	// 		useNewUrlParser: true,
	// 		useCreateIndex: true,
	// 		useUnifiedTopology: true,
	// 		useFindAndModify: false,
	// 	})
	// 	.then(() => {
	// 		const connectedDb =
	// 			process.env.MONGODB_URL_LOCAL === mongoUrl ? "Local" : "Prod";
	// 		console.log(`Connected to ${connectedDb} - Database`);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,POST,PUT,DELETE,PATCH,OPTIONS"
	);
	next();
});

// TODO: Remove this route while deploying in prod
app.get("/", (req, res) => {
	res.json({ message: "Welcome to product repair" });
});

app.get("/productInfo", getData);
app.get("/newRepairData", newRepairData);

app.all("*", (req) => {
	throw new ErrorClass(`Requested URL ${req.path} not found!`, 404);
});

app.use((err, req, res, next) => {
	const errorCode = err.code || 500;
	res.status(errorCode).send({
		message: err.message || "Internal Server Error. Something went wrong!",
		status: errorCode,
	});
});
