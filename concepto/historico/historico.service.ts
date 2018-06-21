import { Historico } from './historico.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HttpClientModule } from "@angular/common/http";
@Injectable()
export class HistoricoService {


    constructor (public http : HttpClient)
    {


    }

    buscaFechasHttp (): Observable<Historico[]> 
    {
        let lista_fechas: Observable<Historico[]>;

        lista_fechas = this.http.get<Historico[]>
        ("https://my-json-server.typicode.com/acachon/myServer/users"); // TODO Poner direccion de donde se coge el historico.

        return lista_fechas;
    }

}