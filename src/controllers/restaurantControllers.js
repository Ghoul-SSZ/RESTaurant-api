const Restaurant = require('../model/restaurantModel');

exports.getOne = async (req, res) => {
	try {
		const doc = await Restaurant.findOne({ id: req.params.id }).lean().exec();

		if (!doc) {
			return res.status(400).end();
		}

		res.status(200).json({ data: doc });
	} catch (err) {
		console.error(err);
		res.status(400).end();
	}
};

exports.getMany = async (req, res) => {
	const order = req.query.orderby || '';

	//const filter = req.query.filterby || '';

	console.log(order);
	try {
		const doc = await Restaurant.find({}, { name: 1, id: 1, _id: 0 }).sort(order).lean().exec();

		if (!doc) {
			return res.status(400).end();
		}

		res.status(200).json({ data: doc });
	} catch (err) {
		console.error(err);
		res.status(400).end();
	}
};

exports.createOne = async (req, res) => {
	try {
		const doc = await Restaurant.create(req.body);
		res.status(201).json({ data: doc });
	} catch (err) {
		console.error(err);
		res.status(400).end();
	}
};

exports.updateOne = async (req, res) => {
	try {
		const updatedDoc = await Restaurant.findOneAndUpdate(req.params.id, req.body, { new: true }).lean().exec();

		if (!updatedDoc) {
			return res.status(400).end();
		}
		res.status(200).json({ data: updatedDoc });
	} catch (err) {
		console.error(err);
		res.status(400).end();
	}
};

exports.removeOne = async (req, res) => {
	try {
		const removed = await Restaurant.findOneAndRemove({ id: req.params.id });

		if (!removed) {
			return res.status(400).end();
		}
		res.status(200).json({ data: removed });
	} catch (err) {
		console.error(err);
		res.status(400).end();
	}
};
