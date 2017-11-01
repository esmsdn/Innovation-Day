# Innovation-Day: Internet of Things - Install Edison&reg;

You will need to download and install the following drivers:

* [The Edison&reg; USB driver (J16 connector)](https://communities.intel.com/external-link.jspa?url=https%3A%2F%2Fdownloadmirror.intel.com%2F26993%2Feng%2FIntelEdisonDriverSetup1.2.1.exe) 
(*not required for this lab*)
* [The FTDI USB driver (J3 connector)](http://www.ftdichip.com/Drivers/CDM/CDM21226_Setup.zip)

## Download and run a SSH Client

A SSH client such as [PuTTY](http://www.putty.org/)) is required to connect to the OS in the Edison compute module to the Wifi network.

## Connecting to your Edison&reg; Board

Connect the USB cable to J3, the mini-USB connector closest to the edge of the board.

You will need to find the serial COM number by opening Device Manager and looking in the "Ports (COM & LPT)" section:

![ports](./images/ports.png "Serial Ports")

You will connect to the module with PuTTY via serial connection at a speed 115200 bps. You might want to save the connection settings to the DEFAULT SETTINGS connection so won't need to set them up again in the future:

![putty](./images/serial.png)

Once you open the connection press enter to get a reply from the module. The original Yokto image comes ready with a blank password for login but in our labs, we usually set "IntelEdison" as the password for the boards before handling them to atendees:

![login](./images/edisonlogin.png)

## WiFi Configuration

Now set up the Wifi connection by running the command:

``` 
    configure_edison --wifi
``` 

Where you will get a list of available WiFi networks to connect:

![configure edison](./images/configure_edison_wifi.png)


## Start the Lab

The next steps depend on each lab, just go to the [Labs page](./README.md) and start the lab you were following:
1. **Easy**: [Node-Red](node-red_lab.md) will help you setting up a visual environment in your device and start creating a full IoT solution with very few code or even no code at all.
1. **Medium**: [Thing Labs](http://thinglabs.io/labs/edison/) is a step by step lab with an Intel Edison board, programming in Node.js and connecting it to IoT Hub. Requires basic JavaScript and Node.js knowledge.
1. **Expert**: [Connect The Dots](http://connectthedots.io) is a full featured lab that takes at least a full day and provides an end to end solution with devices, IoT services, Stream Analytics, Machine Learning and PowerBI.

