const nanoid = require('nanoid')

var smpp = require('smpp');

// SMPP Host (Destination SMSC server you want to connect to)

var session = smpp.connect('smpp://staging.telecomsxchange.com:2776');     // STAGING HOST

// PRODUCTION SMPP URL

//var session = smpp.connect('smpp://smpp01.telecomsxchange.com:2776');     


// Parse the price per message from TCXC SMPP proxy and dsiplaye it in the response.

smpp.addTLV('billing_price', {
    id: 0x1520,
    type: smpp.types.tlv.string
});

// Parse the count of messages from TCXC SMPP proxy and dsiplaye it in the response. 
// Useful when sending UDH or concatenated messages.

smpp.addTLV('billed_msgs_cnt', {
    id: 0x1521,
    type: smpp.types.tlv.string
});




session.bind_transceiver({
	system_id: 'Username',      // You can generate from TCXC buyer portal under accounts page
	password: 'Password'        // You can define in TCXC buyer portal under accounts page
}, function(pdu) {
        if (pdu.command_status == 0) {
                // Successfully bound
                session.submit_sm({
                        
			destination_addr: '9647716568569',       // The destination phone number you want to send a message to
           
                        //source_addr: 'O2App',                  // The Sender ID or Address, This will be displayed to the destination phone number
                       
			source_addr: 'Alert',
                        registered_delivery: 1,   
                        message_id: nanoid(24),
                        short_message:'Hello World' ,           // The message body, Replace it with the message you want to send.
                        
			//message_payload: 'text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text       !1 text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text       !2 text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text       !3'

                }, function(pdu) {
                        if (pdu.command_status == 0) {
                                // Message successfully sent
                                console.log("message sent OK");
                        } else {
				// Message failed to be sent
                                console.log("message sending failed");
                        }
                        console.log("SOMETHING HAPPENNED:",pdu);
                });

		
		// Print Delivery Receipt logs in terminal if DLR is received
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
