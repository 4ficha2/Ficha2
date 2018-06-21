import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MiServidor } from './../../app/MiServidor.service';
import { HistoricoService } from '../../app/historico.service';
import { Historico } from '../../app/historico.model';


@Component({
  selector: 'historico',
  templateUrl: 'historico.html',
  providers: [HistoricoService, MiServidor]

})
export class HistoricoPage {

  imagen: string;
  historico: Historico[];
  usuario: string = "obdulia";    //TODO: incluir la variable del usuario global

  ngOnInit() {
    this.buscarFechas();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private historico_service: HistoricoService, /*historico_service: MiServidor*/) {
    this.imagen = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEfuU8v4pn3n3fR6NLRxBJ2yganPzoFx9hl7iwqx6DC1plU9-Z"; // imagen del alumno (¿poner enlace en el json?)
  }

  buscarFechas() {
    this.historico_service.buscaFechasHttp().subscribe
      (jsonrecibido => this.obtenerFechas(jsonrecibido));

    /*
    this.historico_service.getUsersHttp().subscribe(
    ok => {this.obtenerFechas(ok);},
    ko => {console.log("Respuesta enviarLogin: KO");}
    )
    */
  }

  obtenerFechas(jsonrecibido: any) {
    let primera_pos = jsonrecibido[0];
    console.log("primera_pos.userID " + primera_pos.userID);
    let aux = jsonrecibido.filter(x => x.userName == this.usuario);
    let aux_user = aux[0].userID; // aunque solo me devuelva un usuario me devuelve un array con un solo elemento.
    this.historico = <Historico[]>jsonrecibido[aux_user].history;// En el 0 habría que poner el ID del alumno;*/
  }

}
/*
obtenerFechas(jsonrecibido : any){
  console.log(<Historico[]>jsonrecibido);
  let aux = jsonrecibido.filter(x=>x.userName==this.usuario);

  this.aux = <Historico[]> aux.UserID;
  console.log(this.historico);
}*/

