#!/bin/bash

install_node_red(){
 echo "Installing node-red and libraries"
 npm install -g --unsafe-perm node-red node-red-dashboard node-red-contrib-azureiothubnode node-red-contrib-upm node-red-contrib-os 

 echo "Installing pm2 service for node-red autostart"
 npm install -g --unsafe-perm pm2
}

create_service(){
 echo "Creating pm2 node-red service"
 pm2 start /usr/bin/node-red --node-args="--max-old-space-size=256"
 mkdir /etc/init.d
 pm2 save
 pm2 startup
}

configure_edison --wifi
install_node_red
create_service
