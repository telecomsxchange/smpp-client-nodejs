// This software is released under the MIT license. See the LICENSE file for more information.  
// Telecom XChange LLC Copy Right: (c) 2019-2022, Ameed Jamous.  All rights reserved. 
// License: MIT (It's free to use, modify and distribute.)
// Version: 1.0.0
// Release Date: 2022-06-22 (Last Updated: 2020-07-20)
// Description: Perfomance test for SMPP protocol using node.js.
// Github Repository: https://github.com/telecomsxchange/smpp-client-nodejs.git 
// Warranty: No warranty is provided. The software is provided "as is". 
// --------------------------------------------------------------------------------------------------------------------


// Using https://github.com/farhadi/node-smpp (SMPP client library)

var smpp = require('smpp'); // SMPP client library 

// Configure SMPP host and port - replace with your own host and port values (None TLS)

var session = smpp.connect('smpp://smpphost.com:2775');

// Configure SMPP host and port - replace with your own host and port values (TLS)

// var session = smpp.connect('ssmpp://smpphost.com:4776');

// Configure SMPP session

var { nanoid } = require("nanoid");
var ID = nanoid(10);
session.bind_transceiver({
       
        system_id: 'User', // Insert your SMPP server System_ID
        password: 'password' // Insert your SMPP server password

}, function(pdu) {
        if (pdu.command_status == 0) {
        
            // Configure SMS message to be sent to SMPP server and send it. In this example its set to send 1000 SMS messages to the destination number 19542400000.
                console.log(process.hrtime());  
               
                // create a loop that runs every 5 seconds and sends a message to the SMSC server 
                var i = 0;
                var interval = setInterval(function() { 
               
                for (ii = 0; ii < 1000; ii++ ) { 
                        // Successfully bound
                        session.submit_sm({
                                destination_addr: '19542400000', // Insert your destination number  
                                source_addr: 'Google', // Insert your source number (sender id)
                                registered_delivery: 1, // Set registered delivery (0 = no, 1 = yes)
                                short_message: 'Your verification code is  G-' + ID +ii // Insert your message content
                        }, function(pdu) {
                                if (pdu.command_status == 0) {
                                        // Message successfully sent
                                        console.log("message sent OK", process.hrtime() );
                                } else {
                                        console.time('sendingFailed' ); // Message sending failed
                                        console.log("message sending failed"); // Message sending failed
                                }
                                //console.log(pdu);
                        });
                }
                       
              }, 3000);  // 3000 milliseconds = 3 seconds  
          
                // Handle Delivery Receipts (DR) from SMPP server (if enabled) and print them to the console.

                session.on('deliver_sm', function(pdu) {
                        console.time(pdu)       
                        console._times.clear(); // clear warning
                        console.log('delivered', pdu.short_message); // print delivered + DLR receipt
                        //console.log("delivered...")
                       
                      
                
                if (pdu.esm_class == 4) { // Check if message is a delivery receipt
                        var shortMessage = pdu.short_message; // Get message content
                        //console.time('Received DR: %s', shortMessage);
                        session.send(pdu.response()); // Send response to SMPP server
                      
                }
                
               
            });

            
        }
      
});

