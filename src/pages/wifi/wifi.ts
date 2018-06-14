import { Component } from '@angular/core';
import { Hotspot } from '@ionic-native/hotspot';  
import { HotspotNetwork } from '@ionic-native/hotspot';

@Component({
  selector: 'page-wifi',
  templateUrl: 'wifi.html'
})
export class wifiComponent {

  networksString: Array<string>=["Primero", "Segundo"];
  networksWifi: any;
  
  constructor(private hotspot: Hotspot) {
        
    //Uso el nuevo servicio
    //Este servicio no funciona en emulador web (ionic serve) pues requiere Cordova
    //Cordova facilita el wifi, y si corre en emulador web no va
    this.hotspot.scanWifi().then(
      (networks: Array<HotspotNetwork>) => 
      {
        console.log(networks);
        //alert("scanWifi(0): " + networks[0].SSID);
        this.actualizaWifi(networks);
      }
    );
   
  }

  private actualizaWifi(redes: Array<HotspotNetwork>){
    //Mirar para actualizar esta variable desde la promise then()
    //alert(redes[1].SSID);
    this.networksWifi=redes;
    alert(this.networksWifi[1].SSID);
  }
}
