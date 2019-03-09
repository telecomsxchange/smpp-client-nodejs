var smpp = require('smpp');
var session = smpp.connect('smpp://smpp01.telecomsxchange.com:2776');



session.bind_transceiver({
	system_id: '{SMPP System_UD}',  // You can get credintials at https://members.telecomsxchange.com
	password: '{SMPP Password}'
}, function(pdu) {
	if (pdu.command_status == 0) {
		// Successfully bound
		session.submit_sm({
			//destination_addr: '86617#41799555221',   // Sample of sending message using different carrier
			destination_addr: '19542400000',  // Sending SMS through Defualt Route.
			source_addr: 'MNyCompany',
			registered_delivery: 1,
			short_message: 'Verification code is 13774'
			//message_payload: 'text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text       !1 text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text       !2 text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text       !3'
			
		}, function(pdu) {
			if (pdu.command_status == 0) {
				// IF Message successfully sent
				console.log("message sent OK");
			} else {
				console.log("message sending failed");
			}
			console.log(pdu);
		});

		session.on('deliver_sm', function(pdu) {
			console.log(pdu)
	    		if (pdu.esm_class == 4) {
	       			var shortMessage = pdu.short_message;
	       			console.log('Received DR: %s', shortMessage);
	       			session.send(pdu.response());
	    		}
	    	});

                session.on('pdu', function(pdu) {
                        console.log("GOT PDU ", pdu)
                });



	}
});
