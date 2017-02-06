"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
const util = require('util');
var bing = require('node-bing-api')({ accKey: "5d6c5bed99364dd28fb726b38201b69a" });
var yahooFinance = require('yahoo-finance');

var useEmulator = (process.env.NODE_ENV == 'development');

// Create chat bot
var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector, {
    localizerSettings: { defaultLocale: "es" }
});

var model = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/e912cce5-39d4-4a68-9240-6ee4213d44bc?subscription-key=d41eb70bf2db42c6869a3b0fd6e6ffad";
var recognizer = new builder.LuisRecognizer(model);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });

// Now register begin conversation dialog
intents.onBegin(function (session, args) {
    session.send("Hola. ¿Cómo puedo ayudarte?");
});

// Register default dialog for non-recognized utterances
intents.onDefault(builder.DialogAction.send("Lo siento, eso no lo he entendido. ¿Me lo puedes explicar mejor?"));

// Now define intentss based on intents and entities
// Intent: getlocation
intents.matches('getstockquote', [
   // First step of the dialog
    function (session, args, next) {
        var stockIdEntity = builder.EntityRecognizer.findEntity(args.entities, 'stockid');
        var stockId = session.dialogData.stockId = (stockIdEntity) ? stockIdEntity.entity : null;
        console.log('Intent "getstockquote" stock:' + stockId);
        next();
        // Let's get the stock info from Yahoo! Finance
        yahooFinance.snapshot({
            symbol: session.dialogData.stockId
        }).then(function (data) {
            console.log(data);
            var fmt = new Intl.NumberFormat();
            var stockQuote = session.dialogData.stockQuote = data;
            session.send("Stock %s [%s] Precio %s (%s) Volumen %s",
                stockQuote.name,
                stockQuote.symbol,
                fmt.format(stockQuote.lastTradePriceOnly, { style: 'currency', minimumFractionDigits: 2 }),
                fmt.format(stockQuote.change, { style: 'percent', minimumFractionDigits: 2 }),
                fmt.format(stockQuote.volume, { style: 'decimal', minimumFractionDigits: 2 }));
            builder.Prompts.confirm(session,
                util.format("¿Quieres que te muestre las últimas noticias sobre '%s'?", stockQuote.name),
                { localizationNamespace: 'es' });
        },function (reason) {
                session.send("Lo siento pero no he sido capaz de encontrar información sobre '%s'",
                    session.dialogData.stockId);
        })
    },
    // Second step of the dialog
    function (session, results, next) {
        if (results.response) {
           // Let's get the news about the company from Bing
            bing.news(session.dialogData.stockQuote.name, 
                {top: 3},
                function (error, res, body) {
                if (body.value.length > 0) {
                    session.send("Esto es lo que encontré sobre '%s'\n", session.dialogData.stockQuote.name);
                    body.value.forEach(function (element) {
                        var card = new builder.HeroCard(session)
                            .title(element.name)
                            .text(element.description)
                            .buttons([builder.CardAction.openUrl(session, element.url, "Navegar")]);
                        var msg = new builder.Message(session).addAttachment(card);
                        session.send(msg);
                    });
                }
                else {
                    session.send("Pues parece que no hay muchas noticias hoy sobre ello");
                }
            });
        }
    }
]);
// Intent: gethelp
intents.matches('gethelp', function (session, args) {
    session.send("Soy un bot bastante listo y sé mucho sobre cotizaciones de bolsa. Ponme a prueba")
});

bot.dialog('/', intents);

// Setup Restify Server if needed
if (useEmulator) {
   var restify = require('restify');
   var server = restify.createServer();
   server.listen(3978, function () {
        console.log('test bot endpoint at http://localhost:3978/api/messages');
   });
   server.post('/api/messages', connector.listen());
} else {
   module.exports = { default: connector.listen() };
}
