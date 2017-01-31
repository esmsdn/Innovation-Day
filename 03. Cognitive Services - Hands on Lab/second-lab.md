# BOT FRAMEWORK + LUIS (SEGUNDA PARTE)
* [INTRODUCCIÓN](#introducciÓn)
* [OBTENCIÓN CREDENCIALES DE DESPLIEGUE](#obtenciÓn-credenciales-de-despliegue)
* [DESPLIEGUE FTP](#despliegue-ft)

## INTRODUCCIÓN
En este segunda parte de nuestro laboratorio continuaremos con el despligue de 
nuestro bot en la instancia de Bot Service que creamos en nuestra subscripción de Azure.

#### NOTA
**Esta segunda parte del laboratorio requiere haber completado con éxito las 
instrucciones del [laboratorio anterior](./README.md).**

## OBTENCIÓN CREDENCIALES DE DESPLIEGUE

### Paso 1
Vamos a desplegar nuestro nuevo bot mediante FTP. Para ello deberemos obtener 
las credenciales FTP para poder acceder en nuestra instancia de **Bot Service**
en Azure. 

Dentro del *blade* de configuración de nuestra instancia de **Bot Service** que 
teníamos abierta en el [Paso 4 del laboratorio anterior](./README.md#paso-4),
accedemos a la sección de **Advanced Settings**

![Configuración avanzada en Bot Service](./images/lab2/img1-step1.png)

Nos llevará a un nuevo *blade* de configuración del servicio **Azure Functions** 
que da soporte a nuestro **Bot Service**. Aquí podremos acceder a las credenciales
de despliegue de nuestro bot (**Deployment credentials**)

![Credenciales de despliegue](./images/lab2/img2-step1.png)

En dicho *blade* introducimos un *username* y una contraseña que utilizaremos
con posterioridad para acceder por FTP. Pulsamos sobre el botón `Save`

Ahora accedemos a las propiedades generales de nuestra instancia para 
obtener la dirección FTP que deberemos utilizar.

![Credenciales FTP de nuestro bot](./images/lab2/img3-step1.png)

## DESPLIEGUE FTP

### Paso 2
Ahora deberemos acceder mediante FTP a nuestro **Azure Function** que dará 
soporte de ejecución a nuestro bot. Para ello deberemos utilizar un cliente FTP
configurándole con las credenciales obtenidas en el paso anterior.

En este caso hemos utilizado [Filezilla](https://filezilla-project.org) 

![Configuración cliente FTP](./images/lab2/img1-step2.png)

Una vez configurado el cliente FTP, accedemos a nuestro sitio en Azure.

#### NOTA
**Es posible que la primera vez que conectamos, si utilizamos FTP sobre TLS se 
nos pida confirmación de aceptación del certificado de Azure. Si es así, 
simplemente aceptaremos el certificado, y opcionalmente marcaremos la opción
de confiar en el mismo certificado en sucesivas conexiones si lo 
consideramos oportuno**

Si todo ha ido correctamente, estaremos conectados a nuestro sitio en Azure, 
tal y como muestra la siguiente imagen.

![Conexión FTP exitosa](./images/lab2/img2-step2.png)

Nos posicionaremos localmente en nuestra carpeta de proyecto, donde hemos 
salvado nuestro fichero `index.js` con la interacción avanzada de la
[anterior parte del laboratorio ](./README.md##interacciÓn-avanzada-con-nuestro-bot)

En la parte remota, nos posicionaremos en la correspondiente carpeta dentro del 
servidor (`/site/wwwroot/messages`). Una vez posicionados correctamente tanto
en la parte local como en el servidor, procederemos a sobreescribir el fichero 
`index.js`del servidor con la copia local de nuestra carpeta de proyecto.

![Upload index.js](./images/lab2/img3-step2.png)

Si todo funciona correctamente, y el fichero es subido correctamente, esperaremos 
3-4 minutos para dar tiempo a que nuestra instancia de **Bot Service** reconozca
los cambios y actualice nuestro Bot.

Pasado ese tiempo, volveremos al portal de Azure y accederemos al *blade* generales
de nuestro bot, el cual deberá estar ya mostrando los cambios realizados en 
el fichero `index.js`. Incluso podremos probar nuestras modificaciones utiizando
el emulador de bot embebido en el portal de Azure.

![Bot actualizado](./images/lab2/img4-step2.png)

## UTILIZACIÓN DE LANGUAGE UNDERSTANDING INTELLIGENT SERVICE

### Paso 3

En el siguiente apartado vamos a empezar a utilizar el servicio de **Reconocimiento 
del Lenguaje (LUIS)**. Para ello accederemos a [www.luis.ai](http://www.luis.ai) 
y procederemos identificarnos como desarrollador. Si no tenemos cuenta deberemos
registrarnos como desarrolladores en la misma página.

![Acceso a LUIS](./images/lab2/img1-step3.png)

Una vez identificados entraremos en la gestión de las aplicaciones que tengamos
creadas en nuestra cuenta de LUIS.

Procedemos a dar de alta una aplicación nueva utilizando el botón a tal efecto.

![LUIS Applications](./images/lab2/img2-step3.png)

Nos aparecerá un formulario donde deberemos introducir algunos datos básicos de
nuestra aplicación. En este caso aparte de los datos básicos, hemos seleccionado 
que nuestro escenario de aplicación de LUIS será un Bot, y que nuestra 
aplicación funcionará para idioma Castellano.

![LUIS Application Settings](./images/lab2/img3-step3.png)

Pulsamos el botón de `Add App`y pasaremos a una página donde definiremos y
gestionaremos el modelo que soportará nuestra aplicación.

#### NOTA
*En este laboratorio no entraremos en detalle sobre cómo definir y gestionar
modelos complejos para reconocimiento de lenguaje natural. Si se tiene interés en profundizar más 
se recomienda seguir el [Tutorial de LUIS](http://www.luis.ai/Help)

### Paso 4 

Vamos a empezar por añadir ciertas entidades predefinidas dentro de nuestra 
aplicación. Las entidades predefinidas permiten a nuestro modelo reconocer
cierto tipos de entidades sin necesidad de definirlas ni entrenar nuestro modelo
para ello.

Pulsamos en el botón `Pre-built Entities` y en el dialogo de selección elegimos
las entidades `datetime`, `number` y `money`. Finalizamos pulsando el botón `Ok`

![Entidades predefinidas](./images/lab2/img1-step4.png)

### Paso 5

Añadiremos también algunas entidades definidas por nosotros para su utilización 
posterior. Pulsamos en el botón de `Entities` y añadimos una entidad denominada 
`location`que nos servirá para entender ubicaciones y direcciones.

![Entidades predefinidas](./images/lab2/img1-step5.png)

Creamos además otra entidad denominada `stockid` que también utilizaremos más
adelante.

### Paso 6

A continuación, definiremos cuales serán los `intents` que queremos que nuestro
modelo de LUIS reconozca. Los `intents` no son más que las necesidades o las
intenciones que nuestros interlocutores quieren expresar cuando interactúan 
con nuestro modelo.

En nuestro bot vamos a intentar reconocer cuando alguien quiere saber su
localización actual, también reconoceremos cuando un usuario quiere saber la 
cotización de una acción (*stock*) y le permitiremos preguntar por el día de la 
semana que fue en una fecha concreta.

Empezamos por definir el *intent* `getstockquote`. Pulsamos en el botón `Intents` 
y rellenamos el formulario que nos aparece.

![Definición de intents](./images/lab2/img1-step6.png)

Nos aparecerá como primera declaración (*utterance**) para entrenar nuestro 
modelo aquella que hemos introducido como ejemplo al definir el `intent`. 

![Primera declaración de ejemplo](./images/lab2/img2-step6.png)

Revisamos que sea correcta y que la intención asociada sea la que queremos y en
caso afirmativo la enviamos a nuestro modelo mediante el botón `Submit`.

Defimos de manera similar las intenciones `getlocation` y `getdatedetails`.

### Paso 7 
Ahora que tenemos nuestras entidades y las intenciones definidas, procederemos
a entrenar el modelo para que vaya ajustando su nivel de reconocimiento.

Para ello vamos introduciendo nuevas sentencias en la pestaña de `New utterances` 
y procederemos a asociar los `intents`y las `entidades` correctas en caso de
que el modelo no las reconozca adecuadamente

![Entrenamiento del modelo 1](./images/lab2/img1-step7.png)

![Entrenamiento del modelo 2](./images/lab2/img2-step7.png) 

Una vez que hemos finalizado de introducir declaraciones en nuestro modelo,
pulsaremos el botón `Train` para actualizar nuestro modelo de reconocimiento

![Entrenamiento del modelo final](./images/lab2/img3-step7.png) 

Tomará unos instantes el poder entrenar nuestro modelo. Una vez que esté 
finalizado el proceso, pulsamos el botón de `Publish` y rellenamos los datos 
que nos solicitan.

![Publicación del modelo](./images/lab2/img4-step7.png) 


