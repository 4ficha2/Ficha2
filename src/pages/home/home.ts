import { Component } from '@angular/core';
import { Login } from '../../app/Ficha2.model';
import { MiServidor } from '../../app/MiServidor.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MiServidor]
})

export class HomePage {

  //Variables y atributos de este compoenente
  //----------------------------------------//
  private miLogin: Login;
  private KEY: string="PublicKeyServidor";   //Clave publica del servidor 

  //Constructor e inicializacion del componente
  //-----------------------------------------//
  constructor(private storage: Storage,
              private servicioServidor: MiServidor) {
    //Inicializo los inputs
    this.miLogin= new Login;
    this.miLogin.login="angel";   //Valores por defecto
    this.miLogin.pwd="1234";    //Valor por defecto
  }

  //Funciones y metodos locales
  //----------------------------//

  logIn(){
  //Compongo el objeto Login a enviar y lo mando al servidor
  //Recoge inputs del forumlario
  //Cifra el password la clave guardada en storage local
  //Almacena en storage el token recibido en caso de autenticacion Ok

    //1. Cifro el password antes de enviarlo
    //La llamada y gestion del token es dentro de la promesa
    //Leo (o creo si no existe aun) una KEY de cifrado del/en el storage
    this.storage.get("KEY").then((value) => {
      if (value==null){   //si no existe KEY creo una KEY      
        this.storage.set("KEY", this.KEY);
      }
      else {
        this.KEY=value;
      }
      //Cifro el password
      let passwordCiphered = this.cifrarPassword(this.miLogin.pwd, this.KEY);

      //2. Compongo el objeto a enviar en el post
      let objetoLogin: Login = {
        login: this.miLogin.login,
        pwd: "",      
        pwdCipher: passwordCiphered,
        token: ""
      };

      //3. CReo la misma logica de abajo pero con una funcion asyncrona (Observable)
      this.servicioServidor.enviarLoginObservable(objetoLogin).subscribe(
        OK=>{
            console.log("Respuesta enviarLoginObservable: OK");
            if (OK<0){
              console.log("Usario o password incorrecto");
              alert ("Usario o password incorrecto");
      
            }else{
              console.log("Usario y password autenticados");
              //Almaceno el token facilitado 
              this.storage.set("TOKEN", OK);
              //Salto a la pagina de FIchar !! (por fin dejo esta pagina !!)
              alert("Usario autenticado correctamente (token: "+OK+" )")
            }
        },
        KO=>{
            console.log("Respuesta enviarLoginObservable: KO");
        },
        ()=>{
            console.log("Respuesta enviarLoginObservable: complete()");
        }
      ); 


      /* Esta llamada a enviar Login no es asyncrona y hace que mitoken sea undefined al evaluar
      //3. Llamo al servicio del servidor solicitando mi autenticacion y token
      let miToken = this.servicioServidor.enviarLogin(objetoLogin);
      
      //4. Compruebo si la autenticacion ha ido bien (token>0)
      if (miToken<0){
        console.log("Usario o password incorrecto");
        alert ("Usario o password incorrecto");

      }else{
        console.log("Usario y password autenticados");
        //Almaceno el token facilitado 
        this.storage.set("TOKEN", miToken);
        //Salto a la pagina de FIchar !! (por fin dejo esta pagina !!)
      }*/

    });
  }
    
  cifrarPassword(password: string, key: string): string{
  //Cifra el password con la clave privada facilitada
    let salida: string="";

    //Algoritmo de cifrado sencillo
    key=="" ? salida=password:salida=password.toUpperCase();
      console.log("Password cifrado: ");
      console.log("pwd="+password+";KEY="+key+";pwdCiphered="+salida);

    return salida;
  }

}
