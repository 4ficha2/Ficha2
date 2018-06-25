/**
 * @author  Angel Cachon 
 * 
 * 
 */

import { Component } from '@angular/core';
import { Hotspot } from '@ionic-native/hotspot';  
import { HotspotNetwork } from '@ionic-native/hotspot';

@Component({
  selector: 'page-wifi',
  templateUrl: 'wifi.html'
})
export class wifiComponent {
  [x: string]: any;

  private networksString: Array<string>=["Actualiza pantalla!!"];
  //private networksWifi: Array<HotspotNetwork>;
  
  constructor(private hotspot: Hotspot) { 
  //Uso el nuevo servicio
  //Este servicio no funciona en emulador web (ionic serve) pues requiere Cordova
  //Cordova facilita el wifi, y si corre en emulador web no va
    
    //Compruebo si esta activo el wifi
    this.hotspot.isAvailable().then((flag: boolean) =>
      //ESta funcion (isAvailable) indica si existe wifi ... NO si esta activo o no
      {
        if (flag) {
          alert("Wifi activo. Bien !!");
          //Busco el listado de redes wifi visibles y actualizo el atributo global networksString[]
          //Llamo a esta funcion cuando he comprobado que wifi esta on para mejorar estabilidad
          //Esta funcion activa el wifi aunque no lo estuviera previamente
          this.hotspot.scanWifi().then(
            (networks: Array<HotspotNetwork>) => 
            {
              alert("Listado redes wifi actualizado");
              //Actualizo la variable global donde lo almaceno
              for (let i=0; i<networks.length;i=i+1){
                this.networksString[i]=networks[i].SSID +" - "+ networks[i].BSSID;
              }
            }
          );

        }else {
          alert("No tienes un servicio de wifi !!");      
        }
      }  
    );
  }

  private buscarWifi(): void {
  //Busco el listado de redes wifi visibles y actualizo el atributo global networksString[]
  //Llamo a esta funcion cuando he comprobado que wifi esta on para mejorar estabilidad
    this.hotspot.scanWifi().then(
      (networks: Array<HotspotNetwork>) => 
      {
        alert("Listado redes wifi actualizado");
        //Actualizo la variable global donde lo almaceno
        for (let i=0; i<networks.length;i=i+1){
          this.networksString[i]=networks[i].SSID +" - "+ networks[i].BSSID;
        }
      }
    );
  }
    
}
