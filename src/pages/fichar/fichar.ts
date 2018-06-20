import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-fichar',
  templateUrl: 'fichar.html',
})
export class FicharPage {

  private listadoWifis: Array<string>=["Wifi1", "wifi2", "wifi3"];      //Objeto de prueba para html
  private listadoEventos:Array<string>=["event1", "event2", "event3"];  //Objeto de prueba para html

  constructor (public navCtrl: NavController, public navParams: NavParams) {
    //this.listadoEventos=[];      //Si no hay eventos no se muestran el desplegable ni el boton
  }

  ionViewDidLoad() {
    console.log('Arranco el componente FicharPage');
  }

  seleccionaWifi(opcion: string){
    console.log("Opcion seleccionada: " + opcion);
  }

  seleccionaEvento(indice: number){
    console.log("Indice seleccionado: "+ indice);
  }
}
