var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var shipmentSchema = new mongoose.Schema({
	nickname: {
		type: String
	}
});

module.exports = mongoose.model('shipmentSchema', shipmentSchema);