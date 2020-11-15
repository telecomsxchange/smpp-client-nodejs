//const nanoid = require('nanoid')

var { nanoid } = require("nanoid");
var ID = nanoid(24);
const sleep = require('system-sleep')

var smpp = require('smpp');

// SMPP HOST TARGET 

var session = smpp.connect('smpp://YOUR-SMPP-IP-OR-DOMAIN:PORT');

// Billing TLV - Works with TCXC Platform only

smpp.addTLV('billing_price', {
    id: 0x1520,
    type: smpp.types.tlv.string
});

// Settings & Preferences 

const test_sms_count = 5000;                // Number of SMS messages to send.
const req_sec_limit = 65;                   // Number of messages per second
const sleep_time = 1/req_sec_limit*1000;    // Sleep time / Wait for x secs
let i = 0
let test_end = 0
let start_test_ts = Math.floor(new Date() / 1000)
let end_test_ts
let failed_count = 0
var success_count = 0
let last_sms_sent_time = 0


session.bind_transceiver({

//	SMPP Credintials used during the test.

        system_id: 'ENTER SMPP USER',
        password: 'ENTER SMPP PASSWORD'
        
}, function(pdu) {
	if (pdu.command_status == 0) {
		// Successfully bound
		start_test_ts = Math.floor(new Date() / 1000)
		for(i=0; i<test_sms_count; i++) {
			sleep(sleep_time)
			session.submit_sm({
				destination_addr: '12061233333',         // To Phone Number
				source_addr: '12071233333',             // From Number or Sender ID
				registered_delivery: 1, 
				message_id: ID,
				short_message: 'verification code BBB: ' + ID ,    // Generate random verification code for every message. 
				//message_payload: 'verification code AAA:' + nanoid(4)  // Uncomment if your SMPP server supports message_payload for long messages.
	
			}, function(pdu) {
				if (pdu.command_status == 0) {
					// Message successfully sent
					//console.log("message sent OK")
					success_count++
					end_test_ts = Math.floor(new Date() / 1000)
				} else {

          //console.log("message sending failed");
					failed_count++
					end_test_ts = Math.floor(new Date() / 1000)
				}
			});
			last_sms_sent_time = Math.floor(new Date() / 1000)
		}
	}
});


sleep(sleep_time * test_sms_count)
console.log("Finished sending, sleeping 30 secs");
const end_send_ts = Math.floor(new Date() / 1000);
sleep(10000)

// Console log the final report

console.log("Sent " + success_count + " SMS. Failed: " + failed_count + ". Total req/sec:" + (success_count / ( end_test_ts - start_test_ts)) + ". Waited for " + (end_test_ts - last_sms_sent_time) + " sec for last SMS" );
process.exit()
