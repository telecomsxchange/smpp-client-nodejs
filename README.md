

### SMPP Client (NodeJS) 

These scripts are written in Node.js that uses the SMPP (Short Message Peer-to-Peer) protocol to send SMS messages through a specified SMPP host.

To use this script, you'll need to have Node.js and the 'smpp' library installed on your machine. You can install the 'smpp' library by running the following commands:


**Installation**

Clone this repository to your machine:

```shell
git clone https://github.com/telecomsxchange/smpp-client-nodejs.git
```
Change into the project directory:

```shell
cd smpp-client-nodejs
```

Install the required dependencies:
    
```shell
npm install
```



Once you have the necessary dependencies installed and access to an SMPP host, you can configure the script by replacing the placeholder values in the following lines of code:

```javascript
system_id: 'User', // Insert your SMPP server System_ID
password: 'password' // Insert your SMPP server password


destination_addr: '19542400000', // Replace with your destination number  
source_addr: 'Google', // Replace your source number (sender id)

short_message: 'Your verification code is  G-' + ID +ii // Replace with your message content

```




- Send SMS 

```shell

$ node send.js  // send single message
$ node perftest.js // send multiple messages per second

```


**Using Perftest to send Multiple messages per second**

To use the perftest.js script, you will need to open it in a code editor and configure the following values:

    SMPP HOST: the hostname or IP address of your SMPP server
    PORT: the port number to use for the SMPP connection
    USER: the system ID for authenticating with the SMPP server
    PASS: the password for authenticating with the SMPP server
    MESSAGES COUNT: the number of messages to send through the SMPP server

Once you have configured these values, you can execute the script by running the following command in your terminal:

```shell

$ node perftest.js

```


**Need help?**

If you're having trouble using this project or have a question about it, please don't hesitate to reach out. We're here to help!

One way to get help is to open an issue on the project's GitHub page. When opening an issue, please provide as much detail as possible about the problem you're experiencing. This could include:

    A detailed description of the problem
    The version of the project that you're using
    Any error messages or logs that you're seeing
    Steps to reproduce the problem

We'll do our best to assist you and resolve any issues that you're experiencing. Thank you for using this project!
**Contributing**

We welcome contributions to this project! If you're interested in contributing, please follow these steps:

    1- Fork the repository and clone it to your local machine.
    2- Create a new branch for your changes.
    3- Make your changes and commit them to your branch.
    4- Push your branch to your fork on GitHub.
    5- Open a pull request on the original repository.




