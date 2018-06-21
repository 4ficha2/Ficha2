import { Component } from '@angular/core';
import { NavController, NavParams, DateTime } from 'ionic-angular';
import { MiServidor } from '../../app/MiServidor.service';
import { VarGlobal } from '../../app/MiVarGlobal.service';

@Component({
  selector: 'page-fichar',
  templateUrl: 'fichar.html',
  providers: [MiServidor]
})

export class FicharPage {

  private listadoWifis: Array<string>;      //Objeto de prueba para html
  private listadoEventos:Array<string>=["event1", "00", "01", "10"];  //Objeto de prueba para html
  private miWifiIndex: number;       //wifi seleccionado
  private miEventoIndex: number;     //Evento seleccionado
  private usuario: string;      //TODO: hay que almacenar globalmente el usuario
  private myDate: Date; 
  


  constructor ( public navCtrl: NavController,
                public servicioServidor: MiServidor, 
                public navParams: NavParams,
                //public homeLogin: HomePage,
                private miVarGlobal: VarGlobal) {
    this.usuario=this.miVarGlobal.globalAny;
  }

  ionViewDidLoad() {
    console.log('Arranco el componente FicharPage');
    //Solicito el listado de wifi visibles
    this.listadoWifis=["wifi1", "wifi2"];         //Listado de prueba
  
  }

  botonFichar(){
  //Cuando se pulsa cojo la fecha y la hora y solicito el checkIn
    //Fecha y hora
    let fecha="21/06/2018";
    let hora = "10:30:00";
    
    //Recopio los parametros para la llamada al servidor
    let miLogin =   this.miVarGlobal.globalAny;
    let miWifiName= this.listadoWifis[this.miWifiIndex];
    let miEvento=   this.listadoEventos[this.miEventoIndex];
    console.log("login: " + miLogin);
    console.log("miWifi: " + miWifiName);
    console.log("miEvento: " + miEvento);

    //Llamo al servidor para fichar en el evento elegido
    //Espero confirmacion del servidor y mensaje si lo hubiera para mi
    this.servicioServidor.solicitarFicharObservable(miLogin,miWifiName,miEvento).subscribe(
      OK=>{
          console.log("Respuesta solicitarEventosObservable: OK");
          console.log(OK);
          //Mostrar mensaje bienvenida
          alert("Gracias por registrarte")
          alert("Mensaje: " +OK);
          //TODO: ir a sigiuente componente ... cual ??

      },
      KO=>{
          console.log("Respuesta solicitarEventosObservable: KO");
          //Recordar mensaje bienvenida
          alert("Ya estabas registrado")
          alert("Mensaje: " + KO);
      },
      ()=>{
          console.log("Respuesta solicitarEventosObservable: complete()");
      }
    );
    
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
