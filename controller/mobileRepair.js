const { mobileModel } = require("../models/mobileRepair");
const { sendMail } = require("../services/sendMail");

module.exports.getData = async (req, res, next) => {
	try {
		const data = await mobileModel.find().select("-_id");
		res.send({
			data,
			status: 200,
		});
	} catch (e) {
		next();
	}
};

module.exports.newRepairData = async (req, res, next) => {
	try {
		// console.log("HII");
		const { category, company, model, repairItem, mailId } = req.query;
		// console.log(req.query);
		const message = `Hello Customer your ${category} of company ${company} of ${model} with repair item are ${repairItem} has submitted Our team will get in touch with you soon`;
		const sub = "Regarding to repair your device";
		// console.log(mailId + "" + message + "" + sub);
		const d = await sendMail(mailId, sub, message);
		// console.log(d);
		// const data = await mobileModel.find().select("-_id");
		res.send({
			message: "mail has been sent successfully",
			status: 200,
		});
	} catch (e) {
		next();
	}
};
