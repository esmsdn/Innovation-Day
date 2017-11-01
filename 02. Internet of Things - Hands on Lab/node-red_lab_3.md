# Innovation-Day: Internet of Things - Node-RED Lab 3. Send data to the cloud

To make this data more useful, we will send it to the cloud. We will need some more things for this, here's your bill of materials:

* An Azure account with an IoT Hub service created
* A visualization WebSite
* The Azure node in your Node-RED Flow

## Create an IoT Hub

> If you don't have an Azure Account you can get a [Free Trial](https://azure.microsoft.com/free).

In your browser go to the Azure Portal at <https://portal.azure.com> and login int your subscription.

You create a new IoT Hub with the menu: `new > Internet of Things > IoT Hub`.

![IoTHub1](./images/IoTHub.png)

Once created, select the IoT Hub, click on the **Key** icon (Shared access policies) and select **iothubowner** from the policy. Click the **copy** button next to the *Connection String - Primary Key* to copy it to the clipboard.

![IoTHub3](./images/IoTHub3.png)

*REMEMBER: This connection string is used to manage the IoT Hub, not to be used on devices*

## Create the IoT Device

It is now possible to create devices directly in the Azure portal. From your IoTHub blade, scroll down to Device Explorer under EXPLORERS and add a new device. Type a unique name for your device and make sure "Symmetric Key" and "Auto Generate Keys" are selected. You also want to create and ENABLE the device in your IoT hub, not create it but leaving it disabled:

![IoTHub3a](./images/IoTHub3a.png)

After the device has been created, you get the precious connection string that allows your board to connect to your IoT Hub and be recognized as this device:

![IoTHub3a](./images/IoTHub3b.png)

## Install IoTHub Explorer

Now we will install IoTHub Explorer, a tool to monitor your IoT Hub. You will connect to your IoTHub using the IoT Hub owner credentials you just copied before.

You will do this in a CMD window running in your computer, NOT in the SSH session connected to your Edison module:

```bash
    npm install -g iothub-explorer
```

Now, run the following command to login to your IoTHub:

```bash
    iothub-explorer login "[YOUR IOTHUB CONNECTION STRING]"
```

To check the existence of the Device you just created in the IoT Hub with, run:

```bash
    iothub-explorer list
```

To monitor the messages sent by your device to the IoT Hub, run the following command and leave it running:

```bash
iothub-explorer monitor-events -l "[YOUR IOTHUB CONNECTION STRING]"
```

## Connect to IoT Hub from Node-RED

In the Node-RED flow you created before, add a new function node and connect it to the Temperature output. Write this function inside, it creates a string with an object that we will send through the wire to IoT Hub:

```javascript
    msg.payload={
        deviceId: "Id1",
            location: "[Write your city here]",
            sensorType: "temperature",
            sensorValue: msg.payload
    }
    return msg;
```

Then add an *azureiothub* node, and set the connection string you got for your device. Do not use the general IoT Hub connection string which is intended for managing the hub, but the particular connection string for the device you created previously. Finally, prior to sending the payload you must convert it to a JSON string, this can be done directly in your function using the `JSON.stringify` method or you can add a simple *JSON node* that will convert it for you. You will end with a diagram similar to this one:

![FormatPayload](./images/formatpayload.png "Payload to Azure")

Once you deploy the diagram, you will start sending data to your IoT Hub, you will see a *Connected* message in the IoT Hub node.

*NOTE: If you are using a FREE tier IoTHub, you might want to check the delay in the "Grove Temperature" node so you don't reach the 8K message limit before finishing the lab.*

---
Continue to [Step 4](./node-red_lab_4.md) or return to [index](node-red_lab.md).