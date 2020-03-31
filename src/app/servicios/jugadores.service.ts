import { Injectable } from '@angular/core';
import { ArchivosJugadoresService}from './archivos-jugadores.service'
import { Jugador } from '../clases/jugador';
@Injectable()
export class JugadoresService {

  //peticion:any;
  constructor( public miHttp: ArchivosJugadoresService ) {
   // this.peticion = this.miHttp.traerJugadores();
//    this.peticion = this.miHttp.httpGetO("https://restcountries.eu/rest/v2/all");
  }
  
  filtrado:any;

  public altaJugador( jugador: Jugador ) {
    return this.miHttp.newJugador(jugador).then( resp =>{
      return resp;
    }).catch(err=>{
      console.log(err);
    });
  }

  traertodos(ruta : string,filtro: string) 
  {
    return this.miHttp.traerJugadores(ruta).then(data=>{
      console.info("jugadores service",data);

      this.filtrado=data;

     let  ganador: boolean;
      if(filtro=="ganadores")
      {
        ganador= true;
      }
      else
      {
        ganador= false;
      }

      this.filtrado =this.filtrado.filter(
        data => data.gano === ganador  || filtro=="todos" ); return this.filtrado}
      )
      .catch(errror=>{console.log("error")
      
    return this.filtrado;
    });
  }

}
