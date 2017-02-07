# Innovation-Day: Internet of Things - Node-RED Lab 4. Visualize your data

Now you need a dashboard where visualizing the data you are sending, but, before we will prepare it a little bit to show more relevant data, with average, minimum and maximum values.

## Event Hubs

Event Hubs is a message pub/sub, we will use it to send and receive the averages to represent them inside the website. Create a new Event Hubs in the Azure portal with `New > Internet of Things > Event Hubs`, create a new unique namespace:

![Event Hubs](./images/neweh.png "New Event Hub namespace")

And then you must create an Event Hub, call it **thinglabseventhub**:

![Event Hub](./images/createeh.png "Create Event Hub")

We will use this Event Hub in the Stream Analytics as output and in the WebSite as input.

## Stream Analytics Creation

We will create an Azure Stream Analytics Job. In the Azure portal go create a new ASA:

![ASA](./images/createasa.png "Create ASA")

Configure one input as the IoT Hub you created before:

![ASAInput](./images/asainput.png "Create ASA input")

And for the output, we will use the Event Hub we created before.
Configure the Event Hub as the output of the ASA:

![ASAOutput](./images/asaoutput.png "Create ASA output")

Finally you create a Query and set this select:

```sql
    WITH ProcessedData as (
        SELECT
            MAX(sensorValue) MaxTemperature,
            MIN(sensorValue) MinTemperature,
            AVG(sensorValue) AvgTemperature,
            location,
            deviceId,
            System.Timestamp AS Timestamp
        FROM
            [input]
        WHERE
            sensorType = 'temperature'
        GROUP BY
            TumblingWindow (second, 5), deviceId, location
    )

    -- Make sure this matches your Event Hub output name from above,
    -- If you've forgotten it you can go back and get it in another browser tab
    SELECT * INTO [output] FROM ProcessedData
```

Now you just start this ASA, this will start calculating the minimum, maximum and average every 5 seconds.

## Website Creation

To show the result, we have prepared for you a website that draws the data using the d3js library. You will deploy this app to Azure.

> This procedure uses the same site like the one found in [ThingLabs.io](http://thinglabs.io/labs/edison/grove/visualize/)


1. First you create a WebApp by selecting *New > Web + Mobile > Web App*:

![New Web App](./images/newwebapp.png "New Web App")

2. Configure the deployment options to an External Repository:

![Config Repo](./images/configurerepo.png "Configure Repo")

3. And set the *Repository URL* to this one: **https://github.com/ThingLabsIo/ThingLabs-IoT-Dashboard.git**

4. You must set the WebSockets property to on:

![Activate WebSockets](./images/setwebsockets.png "Activate WebSockets")

Deploy dashboard: https://github.com/ThingLabsIo/ThingLabs-IoT-Dashboard like in http://thinglabs.io/labs/edison/grove/visualize/


---
Continue to [Step 5](./node-red_lab_5.md) or return to [index](node-red_lab.md).