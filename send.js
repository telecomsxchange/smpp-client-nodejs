const nanoid = require('nanoid')

var smpp = require('smpp');
var session = smpp.connect('smpp://staging.telecomsxchange.com:2776');

smpp.addTLV('billing_price', {
    id: 0x1520,
    type: smpp.types.tlv.string
});

smpp.addTLV('billed_msgs_cnt', {
    id: 0x1521,
    type: smpp.types.tlv.string
});



session.bind_transceiver({
	system_id: 'Username',
	password: 'Password'
}, function(pdu) {
        if (pdu.command_status == 0) {
                // Successfully bound
                session.submit_sm({
                        
			destination_addr: '9647716568569',
           
                        //source_addr: 'O2App',
                        source_addr: 'Alert',
                        registered_delivery: 1,   
                        message_id: nanoid(24),
                        short_message:'Hello World' ,
                        //short_message: 'text  text  text  text  text      '
                        //message_payload: 'text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text       !1 text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text       !2 text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text  text       !3'

                }, function(pdu) {
                        if (pdu.command_status == 0) {
                                // Message successfully sent
                                console.log("message sent OK");
                        } else {
                                console.log("message sending failed");
                        }
                        console.log("SOMETHING HAPPENNED:",pdu);
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
