import { Component } from '@angular/core';
import { MiServidor } from './../../app/MiServidor.service';
import { Historico } from '../../app/Ficha2.model';
import { VarGlobal } from '../../app/MiVarGlobal.service';


@Component({
  selector: 'historico',
  templateUrl: 'historico.html',
  providers: [MiServidor]

})
export class HistoricoPage {

  imagen: string;
  historico: Historico[];
  usuario: string;
  private miAvatar: string;     //ruta del avatar del usuario  

  ngOnInit() {
    //Actualizo el historico si hay un usuario logado
    this.usuario?this.buscarFechas():null;
  }

  constructor(private servicioServidor: MiServidor,
              private miVarGlobal: VarGlobal){

    this.imagen = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEfuU8v4pn3n3fR6NLRxBJ2yganPzoFx9hl7iwqx6DC1plU9-Z"; // imagen del alumno (¿poner enlace en el json?)
    this.usuario=this.miVarGlobal.globalAny;
    this.miAvatar=this.miVarGlobal.avatar;        //Avatar
  }

  buscarFechas() {
  //Llamando al nuevo servicio de Jose
  //  this.historico_service.buscaFechasHttp().subscribe
  //    (jsonrecibido => this.obtenerFechas(jsonrecibido));
  //Lamando al servicio ya existente
    this.servicioServidor.getUsersHttp().subscribe
    (jsonrecibido => this.obtenerFechas(jsonrecibido));
  }

  obtenerFechas(jsonrecibido: any) {
    let primera_pos = jsonrecibido[0];
      console.log("primera_pos.userID " + primera_pos.userID);
    let aux = jsonrecibido.filter(x => x.userName == this.usuario);
    let aux_user = aux[0].userID; // aunque solo me devuelva un usuario me devuelve un array con un solo elemento.
    this.historico = <Historico[]>jsonrecibido[aux_user].history;// En el 0 habría que poner el ID del alumno;*/
  }
  
  tarjetaClick(){
    console.log("Click!!");
  }
}

