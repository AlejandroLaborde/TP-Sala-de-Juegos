import { Injectable } from '@angular/core';
import { ArchivosJugadoresService}from './archivos-jugadores.service'
import { Jugador } from '../clases/jugador';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable()
export class JugadoresService {

  activeJugador:Jugador;

  constructor( public miHttp: ArchivosJugadoresService, private httpClient: HttpClient ) {

  }
  
  filtrado:any;

  public altaJugador( jugador: Jugador ) {
    return this.httpClient.post(`${environment.firebaseDB}Jugadores.json`, jugador).toPromise();
  }

  public logueado(){
    if(this.activeJugador==null){
      return false;
    }else
    {
      return true;
    }
  }



  public logIn( usuario:string, clave:string ) {
       return this.getJugadores().pipe(map(datos => this.validaLogIn(datos,usuario,clave))).toPromise();
  }

  public logOut( ) {
    this.activeJugador=null;
  }

  private validaLogIn(datos, usuario, clave){
    let logueo=false;
    datos.forEach( (dato:any)=>{
      if(dato.email == usuario && dato.clave==clave){
        this.activeJugador= new Jugador(dato.email,dato.sexo,dato.cuit,dato.clave);
        logueo= true;
      }else{
        this.activeJugador=null;
      }
    });
    return logueo;
  }
  
  public getJugadores(){
    return this.httpClient.get(`${environment.firebaseDB}Jugadores.json`).pipe(map( datos => this.objecToArray(datos)));
  }

  private objecToArray( datos: Object ){
    const turnos : any[] = [];
    if(datos == null) return [];

    Object.keys( datos ).forEach( key =>{
        let turno: Jugador = datos[key];
        turnos.push(turno);
    })
    return turnos;
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
