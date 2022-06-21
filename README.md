

### SMPP Client (NodeJS) 

The SMPP client(s) in this project works with TCXC (SMS Exchange) or/and any other SMSC host.


### Installation

- Clone this repository to your machine


```shell

$ git clone https://github.com/telecomsxchange/smpp-client-nodejs.git

```

```shell

$ cd /smpp-client-nodejs/

```

- Install node modules

```shell

$ npm install

```

- Open send.js in your text-editor and add configure your 

```
  - SMPP host:port
  - SMPP system_id, password
  - Destination Number 
  - Sender ID (src_address)
  - Message body (short_message or message_payload)
  
  ```


- Send SMS 

```shell

$ node send.js 

```

### Using SMPP Stress Test Client

```shell

$ cd /smpp-client-nodejs/

```

- Install node modules

```shell

$ npm install

```

- Open smpp-stress-tester.js in your code editor and configure:-


```
  - SMPP host:port
  - SMPP system_id, password
  - Destination Number 
  - Sender ID (src_address)
  - Message body (short_message or message_payload)
  
  ```

```javascript


const test_sms_count = 5000;                // Number of SMS messages to send.
const req_sec_limit = 65;                   // Number of messages per second
const sleep_time = 1/req_sec_limit*1000;    // Sleep time / Wait for x secs

```


- Start SMPP test

```shell

$ node smpp-stress-tester.js

```

### Using Perftest (recommended)

Open `perftest.js` in your code editor and configure `SMPP HOST, PORT, USER, PASS, MESSAGES COUNT`, once done, execute the script

```shell

$ node perftest.js

```


### Using this SendViber.js script to send a message to Viber user

This configuration only works if you're using TCXC to send messages through viber. You must first have purchased Viber SMS route on TCXC first in order to be routed through the correct link, We also require sender ID verification process to whitelist your brandname or sender id.

If you have done that already, you may send a test message to a viber phone number as shown below.

```shell

$ node SendViber.js

```

### Got Stuck?

If you're stuck please open a github issue (https://github.com/telecomsxchange/smpp-client-nodejs/issues )


### Contribuations

Please create a pull request to submit your contrubuations back with the community. Thank you


