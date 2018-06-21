import { Injectable } from "@angular/core";

import { Storage } from '@ionic/storage';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { Login, User } from "./Ficha2.model";

@Injectable()
export class MiServidor {
//Servicio para aglutinar los servicios al servidor
//Emula al servidor (stub)

    //Variables y atributos locales al servicio
    //-----------------------------------------//
    static URL_SERVICIO_USERS: string = "https://my-json-server.typicode.com/acachon/myServer/users";
    static URL_SERVICIO_EVENTOS: string = "https://my-json-server.typicode.com/acachon/myServer/wifiEventos";
    
    //Constructor e inicializacion del servicio
    //-----------------------------------------//
    constructor(public storage: Storage, 
                public http : HttpClient){
    }
    
    //Funciones y metodos del servicio
    //-----------------------------------------//
    
    public solicitarFicharObservable(miLogin,miWifiName,miEvento): Observable<string> {
    //Funcion Servidor emulado
    //Revisa el cheeckIn del usuario en el evento, y confirma checkIn y el mensaje para el si lo hay
    //Llama a la base de datos de usuarios (db.json en mi github)
    //Actualiza el historico para incluir este nuevo registro (si es la primera vez)
    //Devuelve un responseText (string) con el mensaje de bienvenida si lo hay en OK
    //Devuelve un mensaje de KO si ya estaba registrado

        let response=new Observable<string>((observer) => {
            // observable execution
            console.log("solicitarFicharObservable llamado");
            //Pido al servidor el listado de usuarios registrados (get)
            this.getUsersHttp().subscribe(
                OK=>{                                           //Si no estaba aun registrado
                    //Evaluo a nivel de servidor los datos
                    //1. Localizo al usuario
                    let usuario: any = OK.filter(usuario => usuario.userName == miLogin);
                    //2. Localizo el evento
                    let evento : any = usuario[0].eventList.filter((x: any ) => x.eventName==miEvento);
                    //3. Reviso el estado de checkIn
                    //TODO: falta revisar la hora para indicar si tarde o no.
                    
                    if (usuario.length==0 || evento.length==0 ) {
                        observer.error("Usuario y evento no encontrados!!");
                    } 
                        else if (evento[0].checkIn) {           //Usuario ya registrado, repito el mensaje
                            observer.error(evento[0].message);
                        } 
                            else {                            //Usuario registrado con exito, envio el mensaje
                                observer.next(evento[0].message);
                            }
                },
                KO=>{                                           //Si ya estaba registrado
                    console.log("Respuesta enviarLogin: KO");
                    observer.error("Error interno al fichar!!");     //Tambien le recuerdo el mensaje de bienvenida
                }
            );
        });
        return response;
    }

    public solicitarEventosObservable (wifiNombre: string, usuario: string): Observable<[string]> {
    //Funcion Servidor emulado
    //Solicita todos los eventos asociados a un wifi disponibles para el usuario
    //Llama a la base de datos de wifiEventos (db.json en mi github)
    //Busca el wifi y recopila los eventos donde el usuario esta registrado
    //Devuelve un listado de eventos (Observable)

        let misEventos=new Observable<[string]>((observer) => {
            console.log("SolicitarEventosObservable llamado");
            //Pido al servidor el listado de wifiEventos (get)
            this.getEventosHttp().subscribe(
                OK=>{
                    console.log("Respuesta getEventosHttp: OK");
                    //Selecciono el wifi y recopilo los eventos donde el usario esta
                    let miWifi= OK.filter(wifi =>wifi.wifiName===wifiNombre);
                    let miEventArray = miWifi[0].eventArray;      
                    let numEventos=0;
                    let miLista1: [string]=[""];

                    for (let j=0;j<miEventArray.length;j++){    //Recorro los eventos
                        let k=0;
                        while(miEventArray[j].users[k]!=usuario && k<miEventArray[j].users.length){    //Busco en los usuarios
                            k++;
                        }
                        if (miEventArray[j].users[k]==usuario){
                            miLista1[numEventos]=miEventArray[j].eventName;    //Incluyo el eventName si encontre al usuario
                            numEventos++;
                        }
                    }
                    //Vacio miLista si no hay eventos (hago esto porque si inicializo a [] funciona pero VSCode lo pone rojo!!)
                    numEventos==0?miLista1.pop():null;
                    console.log(miLista1);

                    //Devuelvo el listado de Eventos disponibles para el usuario en ese wifi
                    observer.next(miLista1); 
                },
                KO=>{
                    console.log("Respuesta getEventosHttp: KO");
                    //Este valor indica que no hay listado
                    observer.next([null]);
                }
            );

        });
        return misEventos;
    }

    public enviarLoginObservable (login: Login): Observable<number> {
    //Funcion Servidor emulado
    //Revisa si el login y el password coinciden con los registrados
    //Llama a la base de datos de usuarios (db.json en mi github)
    //Descifra el password y comprueba si existe login y password coincide
    //Devuelve un token (Observable) que se genera en la DB

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

    getEventosHttp (): Observable<[any]>{
    //Servicio para recuperar de mi github la base de datos de wifiEventos
        let listaEventos : Observable<[any]>;

            listaEventos = this.http.get<[any]> (MiServidor.URL_SERVICIO_EVENTOS);
        
        return listaEventos;
    }

    getUsersHttp (): Observable<[User]>{
    //Servicio para recuperar de mi github la base de datos de usuarios
        let listaUsuarios : Observable<[User]>;

            listaUsuarios = this.http.get<[User]> (MiServidor.URL_SERVICIO_USERS);
        
        return listaUsuarios;
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

    cifrarPassword(password: string, key: string): string{
        //Cifra el password con la clave privada facilitada
        //Servicio de pseudoServidor
            let salida: string="";
        
            //Algoritmo de cifrado sencillo
            key=="" ? salida=password:salida=password.toLowerCase();
            console.log("Password descifrado: ");
            
            return salida;
    }

}









    //Codigo a reutilizar en otros caso, ejemplos y templates
    //------------------------------------------------------//
    
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