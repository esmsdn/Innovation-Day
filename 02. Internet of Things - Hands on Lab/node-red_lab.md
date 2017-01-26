# Innovation-Day: Internet of Things - Node-red Lab

[Node-red](http://nodered.org) is an IoT platform that lets you build IoT Solutions with a graphical interface.

## Node-red installation

For using node-red with an Intel Edison board you will have to login inside the board and run the following commands:

First install node-red:

```
    npm install -g node-red
```

You can run node-red by typing

```
    node-red
```

and you will be able to open a web browser in

        http://[boardaddress]:1880

You just stop it with *CTRL+C*, then you can install some useful modules like *upm* to use the sensors in the Grove Kit

```
    npm install -g node-red-node-upm
```

And finally you install the module to connect to IoT Hub:

```
    npm install -g node-red-contrib-azureiothubnode
```

## Lab

Now you begin a step-by-step lab, but feel free to tinker and play with the hardware.

### 1. Connect the Grove Kit sensors

### 2. Create a flow in node-red

### 3. Create a IoT Hub

### 4. Deploy a visual Web App

### 5. Receive Cloud to Device messages
 
## More

You can run Node-RED in many platforms, including Azure: https://nodered.org/docs/platforms/azure

