import { Injectable } from "@angular/core";

import { Storage } from '@ionic/storage';
import { Login, User } from "./Ficha2.model";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MiServidor {
//Servicio para aglutinar los servicios al servidor
//Emula al servidor (stub)

    //Variables y atributos locales al servicio
    //-----------------------------------------//
    private miLogin: Login;
    static URL_SERVICIO_USERS: string = "https://my-json-server.typicode.com/acachon/myServer/users";
    
    //Constructor e inicializacion del servicio
    //-----------------------------------------//

    constructor(public storage: Storage, 
                public http : HttpClient){

    //Pruebo a subscribirme a un observable creado por mi
        /*     
        this.observerToken.subscribe(
        OK=>{
            console.log("Respuesta enviarLogin: OK");
            console.log(OK);
        },
        KO=>{
            console.log("Respuesta enviarLogin: KO");
            console.log(KO);
        },
        ()=>{
            console.log("Respuesta enviarLogin: complete()");
        }
        );*/

        //Pruebo con una funcion con observable y parametros
        /*
        this.mifuncionObservable(123).subscribe(
            OK=>{
                console.log("Respuesta enviarLogin: OK");
                console.log(OK);
            },
            KO=>{
                console.log("Respuesta enviarLogin: KO");
                console.log(KO);
            },
            ()=>{
                console.log("Respuesta enviarLogin: complete()");
            }
        );*/

    }
    
    //Funciones y metodos del servicio
    //-----------------------------------------//

    //Recreo la funcion enviarLogin como un observable
    public enviarLoginObservable (login: Login): Observable<number> {
        let token=new Observable<number>((observer) => {
            // observable execution
            console.log("enviarLogin llamado");
            //Pido al servidor el listado de usuarios registrados (get)
            this.getUsersHttp().subscribe(
                OK=>{
                    console.log("Respuesta enviarLogin: OK");
                    //Compruebo si login y password son correctos y recupero el token
                    //Servicio de pseudoServidor
                    //token = this.comprobarLogin(login,<[User]>OK);
                    observer.next(this.comprobarLogin(login,<[User]>OK)); 
                },
                KO=>{
                    console.log("Respuesta enviarLogin: KO");
                    //token=-1;   //Este valor indica que no hay token
                    observer.next(-1);
                }
            );

        });
        return token;
    }



    public enviarLogin (login: Login): number{
    //Envia al servidor la peticion para logarse
    //Entrada: uri del servicio, objeto Login
    //Salida: {response: string, token: number}
        console.log("enviarLogin llamado");
        let token: number;
        
        //Pido al servidor el listado de usuarios registrados (get)
        this.getUsersHttp().subscribe(
            OK=>{
                console.log("Respuesta enviarLogin: OK");
                //Compruebo si login y password son correctos y recupero el token
                //Servicio de pseudoServidor
                token = this.comprobarLogin(login,<[User]>OK); 
            },
            KO=>{
                console.log("Respuesta enviarLogin: KO");
                token=-1;   //Este valor indica que no hay token
            }
        );       
        return token;
    }

    comprobarLogin (login: Login, listadoUsuarios: [User]): number{
    //Comprueba si el login y password corresponde con listadoUsers
    //Servicio de pseudoServidor
        let token: number;
            //Descrifro el password
            let password = this.cifrarPassword(login.pwdCipher,"PrivateKeyServidor");
            let usuario = login.login; 

            //Busco si esta el login y si coincide el password
            let usuarioEncontrado = listadoUsuarios.find(o => o.userName == usuario);
            if (usuarioEncontrado==undefined){
                console.log("Usuario no registrado");
                token=-1;
            }
            else{
                if (usuarioEncontrado.pin!=password){
                    console.log("Password no coincide");
                    token=-1;
                }
                else{
                    console.log("Usuario autentificado");
                    token=usuarioEncontrado.token;
                }
            }
        return token;
    }

    getUsersHttp (): Observable<[User]>{
    //Servicio similar al anterior pero devulve un objeto Persona y no un array de Persona
        let listaUsuarios : Observable<[User]>;

            listaUsuarios = this.http.get<[User]> (MiServidor.URL_SERVICIO_USERS);
        
        return listaUsuarios;
    }

    cifrarPassword(password: string, key: string): string{
    //Cifra el password con la clave privada facilitada
    //Servicio de pseudoServidor
        let salida: string="";
    
        //Algoritmo de cifrado sencillo
        key=="" ? salida=password:salida=password.toLowerCase();
        console.log("Password descifrado: ");
        
        return salida;
    }


    /* Ejemplo de como devilver una promesa
    public itemsRefresh(): any { 
    //Recupera del storage el listado de canciones favoritas
    //Salida: devuelve una promesa con el array de canciones
        return this.storage.get("favoritosDB").then((val) =>
        {
            var listado=val;
            return listado;
        });
    }*/

    /* Ejemplo para crear un Observable
        import { Observable } from "rxjs/Observable"

        // create observable
        const simpleObservable = new Observable((observer) => {
            
            // observable execution
            observer.next("bla bla bla")
            observer.complete()
        })

        // subscribe to the observable
        simpleObservable.subscribe()

        // dispose the observable
        simpleObservable.unsubscribe()
    */
    /*
    //Creo mi propio observable
    public observerToken=new Observable((observer) => {
        // observable execution
        observer.next("bla bla bla")
        observer.complete()
    })

    //Recreo la funcion enviarLogin como un observable
    public mifuncionObservable (numero: number): Observable<number> {
        let token=new Observable<number>((observer) => {
            // observable execution
            observer.next(numero);
            observer.complete();
        });

        return token;
    }*/
}