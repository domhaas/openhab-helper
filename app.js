var Cul = require('cul');
var sensor = require('node-dht-sensor');
var Openhab_Connector = require('./lib/openhab_connector.js');


/*----------------------------------------------------------------*/
var openhab = new Openhab_Connector({
	url: "http://192.168.10.3:8080"
});

setInterval(function () { 
	sensor.read(22, 24, function(err, temperature, humidity) {
		if (!err) {
			openhab.setItemValue("dht22_1_temp", temperature.toFixed(1));
			setTimeout(function() {
				openhab.setItemValue("dht22_1_hum", humidity.toFixed(1));
			}, 500);
		} else {
			console.log(err);
		}
	});
}, 30000);
/*----------------------------------------------------------------*/


/*----------------------------------------------------------------*/
var cul = new Cul({
    serialport: '/dev/ttyACM0',
    mode: 'SlowRF'
});

cul.on('data', function (raw, obj) {
	if ( (obj.address !== 0) && (obj.address !== 5) ) {
		return;
	}
	
	openhab.setItemValue('s300_'+(obj.address+1)+'_temp', obj.data.temperature.toFixed(1));
	setTimeout(function() {
		openhab.setItemValue('s300_'+(obj.address+1)+'_hum', obj.data.humidity.toFixed(1));
	}, 500);
});
/*----------------------------------------------------------------*/

