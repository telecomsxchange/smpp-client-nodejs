// This software is released under the MIT license. See the LICENSE file for more information.  
// Telecom XChange LLC Copy Right: (c) 2019-2022, Ameed Jamous.  All rights reserved. 
// License: MIT (It's free to use, modify and distribute.)
// Version: 1.0.0
// Release Date: 2022-06-22 (Last Updated: 2020-06-22)
// Description: Send SMS using SMPP protocol using node.js.
// Github Repository: https://github.com/telecomsxchange/smpp-client-nodejs.git 
// Warranty: No warranty is provided. The software is provided "as is". 
// --------------------------------------------------------------------------------------------------------------------

//const nanoid = require('nanoid')

var { nanoid } = require("nanoid");
var ID = nanoid(24);

// Use https://github.com/farhadi/node-smpp (SMPP client library)

var smpp = require("smpp");

// SMPP Host (Destination SMSC server you want to connect to)

var session = smpp.connect("smpp://smpp01.telecomsxchange.com:2776"); // PROD SMSC

// CUSTOM TLV PARSING, Parse the price per message from TCXC SMSC and displayed it in the response. 

smpp.addTLV("billing_price", {
  id: 0x1520,
  type: smpp.types.tlv.string,
});

// Parse the count of messages from TCXC SMPP proxy and dsiplaye it in the response.
// Useful when sending UDH or concatenated messages.

smpp.addTLV("billed_msgs_cnt", {
  id: 0x1521,
  type: smpp.types.tlv.string,
});

session.bind_transceiver(
  {
    system_id: "System_ID", // You can generate SMPP System_ID TCXC buyer portal under accounts page
    password: "Password", // You can define SMPP password in TCXC buyer portal under accounts page
  },
  function (pdu) {
    if (pdu.command_status == 0) {
      // Successfully bound
      session.submit_sm(
        {
          destination_addr: "12345678911", // The destination phone number you want to send a message to
          source_addr_ton: 5, // Type of number of the source address
          source_addr_npi: 0, // 0 = Unknown, 1 = ISDN, 3 = Data, 4 = Telex, 5 = SMS, 6 = Radio, 7 = Fax, 8 = Videotelephony
          dest_addr_ton: 1, // Type of number of the destination phone number
          dest_addr_npi: 1, // 0 = Unknown, 1 = ISDN, 3 = Data, 4 = Telex, 5 = SMS, 6 = Radio, 7 = Fax, 8 = Videotelephony
          source_addr: 'Google',       // The Sender ID or Address, This will be displayed to the destination phone number
          registered_delivery: 1, // Set registered delivery (0 = no, 1 = yes)
          message_id: ID, // Message ID
          short_message: "Your verification code is " + ID, // The message body, Replace it with the message you want to send.

          //message_payload: 'Optional message payload supports up to 65536 bytes'

        },
        function (pdu) { // Callback function for submit_sm
          if (pdu.command_status == 0) { // Successfully submitted
            // Message successfully sent
            console.log("message sent OK");
          } else {
            // Message failed to be sent
            console.log("message sending failed");
          }
          console.log("SOMETHING HAPPENNED:", pdu); // Log the response
        }
      );

      // Print Delivery Receipt logs in terminal if DLR is received
      session.on("deliver_sm", function (pdu) { // Listen for deliver_sm events
        console.log(pdu); // Log the response
        if (pdu.esm_class == 4) { // Check if the message is a delivery receipt
          var shortMessage = pdu.short_message; // Get the message body
          console.log("Received DR: %s", shortMessage); // Log the response
          session.send(pdu.response()); // Send the response to the SMSC
        }
      });

      session.on("pdu", function (pdu) { // Listen for pdu events
        console.log("GOT PDU ", pdu); // Log the response
      });
    }
  }
);
