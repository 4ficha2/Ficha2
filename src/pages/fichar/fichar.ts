import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MiServidor } from '../../app/MiServidor.service';

@Component({
  selector: 'page-fichar',
  templateUrl: 'fichar.html',
  providers: [MiServidor]
})

export class FicharPage {

  private listadoWifis: Array<string>;      //Objeto de prueba para html
  private listadoEventos:Array<string>=["event1", "00", "01", "10"];  //Objeto de prueba para html
  private usuario: string;      //TODO: hay que almacenar globalmente el usuario

  constructor ( public navCtrl: NavController,
                public servicioServidor: MiServidor, 
                public navParams: NavParams) {
    //this.listadoEventos=[];      //Si no hay eventos no se muestran el desplegable ni el boton
    this.usuario="angel";          //Lo predefino para pruebas              
  }

  ionViewDidLoad() {
    console.log('Arranco el componente FicharPage');
    //Solicito el listado de wifi visibles
    this.listadoWifis=["wifi1", "wifi2"];         //Listado de prueba
  
  }

  seleccionaEvento(indice: number){
    console.log("Indice seleccionado: "+ indice);
  }

  seleccionaWifi(opcion: string){
  //Recupero el listado de eventos asociados al wifi seleccionado
    console.log("Opcion seleccionada: " + opcion);

    //3. Creo la logica para actualizar el listado de Eventos disponibles
    this.servicioServidor.solicitarEventosObservable(opcion,this.usuario).subscribe(
      OK=>{
          console.log("Respuesta solicitarEventosObservable: OK");
          console.log(OK);
          this.listadoEventos=OK;
      },
      KO=>{
          console.log("Respuesta solicitarEventosObservable: KO");
          alert("El usuario no tiene eventos disponibles en este wifi");
      },
      ()=>{
          console.log("Respuesta solicitarEventosObservable: complete()");
      }
    );
  }

}
