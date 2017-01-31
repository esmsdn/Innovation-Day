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

  










