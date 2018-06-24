import { Component } from '@angular/core';
import { NavController, NavParams, DateTime } from 'ionic-angular';
import { MiServidor } from '../../app/MiServidor.service';
import { VarGlobal } from '../../app/MiVarGlobal.service';
import { Hotspot } from '@ionic-native/hotspot';
import { HotspotNetwork } from '@ionic-native/hotspot';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'page-fichar',
  templateUrl: 'fichar.html',
  providers: [MiServidor]
})

export class FicharPage {

  private listadoWifis: Array<string>=["GET12-06"];      //Objeto de prueba para html
  private listadoEventos:Array<string>;     //Objeto de prueba para html
  private miWifiIndex: number;       //wifi seleccionado
  private miEventoIndex: number;     //Evento seleccionado
  private usuario: string;      //TODO: hay que almacenar globalmente el usuario
  private myDate: Date;
  private myTime: string;
  private miAvatar: string;     //ruta del avatar del usuario
  private networksString: Array<string>=["Actualiza pantalla!!"];
  private mensajeEvento: string;
  private nombreEvento: string="Mensaje del curso "; 
  


  constructor ( public navCtrl: NavController,
                public servicioServidor: MiServidor, 
                public navParams: NavParams,
                private hotspot: Hotspot,
                private miVarGlobal: VarGlobal) {

    this.usuario=this.miVarGlobal.globalAny;      //Usuario
    this.miAvatar=this.miVarGlobal.avatar;        //Avatar
    //this.usuario?this.buscarWifi():null;          //Bloqueo la actualizacion real de wifi para depurar en web
  }

  ionViewDidLoad() {
    console.log('Arranco el componente FicharPage');
    //Solicito el listado de wifi visibles
    this.listadoWifis=["wifi1", "wifi2", "wifiKO", "GET12-06"];         //Listado de prueba
 
    //Actualizo la hora
    let dt = new Date();
    
    let month = (dt.getMonth()+1);
    let mes = month.toString();
    let anio = dt.getFullYear().toString();
    let dia = dt.getDate().toString();
    let horas = dt.getHours().toString();
    let minutos = dt.getMinutes().toString();
    minutos.length==1?minutos="0"+minutos:null;
    horas.length==1?horas="0"+horas:null;
    dia.length==1?dia="0"+dia:null;
    mes.length==1?mes="0"+mes:null;

    this.myTime = horas + ":" + minutos + "  del  " + dia + "/" + mes + "/"+anio;
  
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
          this.mensajeEvento=OK;
          this.nombreEvento="Mensaje del curso " + miEvento;
      },
      KO=>{
          console.log("Respuesta solicitarEventosObservable: KO");
          //Recordar mensaje bienvenida
          alert("Ya estabas registrado")
          this.mensajeEvento=KO;
          this.nombreEvento="Mensaje del curso " + miEvento;
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

  private buscarWifi(): void {
  //Busco el listado de redes wifi visibles y actualizo el atributo global networksString[]
  //Llamo a esta funcion cuando he comprobado que wifi esta on para mejorar estabilidad
    this.hotspot.scanWifi().then(
      (networks: Array<HotspotNetwork>) => 
      {
        //alert("Listado redes wifi actualizado");
        //Actualizo la variable global donde lo almaceno
        for (let i=0; i<networks.length;i=i+1){
          this.networksString[i]=networks[i].SSID;  //Esta ya no hace falta
          this.listadoWifis[i]=networks[i].SSID;
        }
      }
    );
  }

}
