import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http/mi-http.service'; 
import { Jugador } from '../clases/jugador';
import { environment } from '../../environments/environment';


@Injectable()
export class ArchivosJugadoresService {

  api="http://localhost:8080/jugadoresarchivo/apirestjugadores/";
  peticion:any;
  constructor( public miHttp: MiHttpService ) {
  }

  public newJugador( jugador: Jugador ){
    return this.miHttp.http.post(`${environment.firebaseDB}Jugadores.json`, jugador).toPromise();
  }
  
  public   traerJugadores(ruta) {
    return this.miHttp.httpGetO(this.api+ruta)
    .toPromise()
    .then( data => {
      console.log("Archivo jugadores");
     // console.log( data );
      return data;
    }, err => {
      console.log( err );
    })
 
  }



}
