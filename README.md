![](https://user-images.githubusercontent.com/26701933/54167718-c5161f80-4473-11e9-82cc-f6ff64227d8e.png)

### SMPP Client (NodeJS) works with TCXC SMPP proxy (SMS Exchange) or any other SMPP host.

You can get an SMPP account at https://members.telecomsxchange.com

if you dont have an existing buyer account on TelecomsXChange visit www.telecomsxchange.com/buyerjoin 


### Installation

- Clone this repository to your machine
```shell

git clone https://github.com/telecomsxchange/smpp-client-nodejs.git

```

```shell

cd /smpp-client-nodejs/

```

- Install node modules

```shell

#npm install

#npm install system-sleep

```

- Open send.js in your text-editor and add your SMPP host,port, username, password.


- Send SMS 

```shell

node send.js 

```

### SMPP Stress Test Client

```shell

cd /smpp-client-nodejs/

```

- Install node modules

```shell

npm install

```

- Open smpp-stress-tester.js in your code editor and configure SMPP HOST, PORT, USER, PASS, MESSAGES COUNT etc..

```javascript


const test_sms_count = 5000;                // Number of SMS messages to send.
const req_sec_limit = 65;                   // Number of messages per second
const sleep_time = 1/req_sec_limit*1000;    // Sleep time / Wait for x secs

```


- Start SMPP test

```shell

node smpp-stress-tester.js

```



### Using this SendViber.js script to send a message to Viber user

This configuration only works if you're using TCXC to send messages through viber. You must first have purchased Viber SMS route on TCXC first in order to be routed through the correct link, We also require sender ID verification process to whitelist your brandname or sender id.

If you have done that already, you may send a test message to a viber phone number as shown below.

```shell

SendViber.js

```

### Got Stuck?

If you're stuck please open a github issue (https://github.com/telecomsxchange/smpp-client-nodejs/issues )

If you're a TCXC member (Paying subscriber) you may open a trouble ticket by emailing support@telecomsxchange.com


