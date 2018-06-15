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
  private networksWifi: any;
  
  constructor(private hotspot: Hotspot) { 
    
    //Uso el nuevo servicio
    //Este servicio no funciona en emulador web (ionic serve) pues requiere Cordova
    //Cordova facilita el wifi, y si corre en emulador web no va
    this.hotspot.scanWifi().then(
      (networks: Array<HotspotNetwork>) => 
      {
        alert("Listado redes wifi actualizado");

        this.networksString[0]=networks[0].SSID;
        this.networksString[1]="L:"+networks.length;
        
        for (let i=0; i<networks.length;i=i+1){
          this.networksString[i]=networks[i].SSID +" - "+ networks[i].BSSID;
        }
      }
    );

  }

}
