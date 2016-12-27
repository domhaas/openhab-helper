function Openhab_Connector(options) {
	this.options = options;
	this.request = require('request');
}
Openhab_Connector.prototype.setItemValue = function(item,value) {
	console.log(this.options.url+'/rest/items/'+item+' : '+value);
	this.request({
		url: this.options.url+'/rest/items/'+item,
		body: value,
		method: 'POST',
		headers: {
			'Content-Type': 'text/plain'
		}
	}, function(error, response, body){
		if(error) {
			console.log(error);
		}
	});
};
module.exports = Openhab_Connector;