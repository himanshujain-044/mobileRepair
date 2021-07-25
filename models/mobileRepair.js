const mongoose = require("mongoose");

const mobileSchema = new mongoose.Schema({
	Category: {
		type: String,
	},
	Company: {
		type: String,
	},
	Model: {
		type: String,
	},
});

const mobileModel = mongoose.model("ProductCompany", mobileSchema);
module.exports = {
	mobileModel,
};
