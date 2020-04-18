import { Injectable } from '@angular/core';
import { ArchivosJugadoresService}from './archivos-jugadores.service'
import { Jugador } from '../clases/jugador';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable()
export class JugadoresService {

  public activeJugador:Jugador;

  constructor( public miHttp: ArchivosJugadoresService, private httpClient: HttpClient ) {

  }
  
  filtrado:any;

  public altaJugador( jugador: Jugador ) {
    return this.httpClient.post(`${environment.firebaseDB}Jugadores.json`, jugador).toPromise();
  }

  public logIn( usuario:string, clave:string ) {
    return this.getJugadores().pipe(map(datos => this.validaLogIn(datos,usuario,clave))).toPromise();
  }
  public getJugadores(){
    return this.httpClient.get(`${environment.firebaseDB}Jugadores.json`).pipe(map( datos => this.objecToArray(datos)));
  }
  
  public logOut( ) {
    this.activeJugador=null;
  } 

  public getUsuarioActual(){
    return this.activeJugador.email;
  }

  public getIdActual(){
    return this.activeJugador.id;
  }
  

  public getJugador( id:string){
    return this.httpClient.get(`${environment.firebaseDB}Jugadores/${id}.json`);
  }

  public updateJugador(id:string , gano:boolean ){
    console.log(id + " " + gano);
    this.getJugador(id).subscribe( (jugador:any)=>{
      jugador.gano=gano;
      console.log(jugador);
      this.httpClient.put(`${environment.firebaseDB}Jugadores/${id}.json`,jugador).subscribe(()=>{});
    })
    
  }
  
  public logueado(){

    if(this.activeJugador==null){
      return false;
    }else
    {
      return true;
    }
  }


  private validaLogIn(datos, usuario, clave){
    let logueo=false;
    datos.forEach( (dato:any)=>{
      if(dato.email == usuario && dato.clave==clave){
        this.activeJugador = new Jugador(dato.email,dato.sexo,dato.cuit,dato.clave,dato.id);
        
        logueo= true;
      }
    });
    return logueo;
  }
  

  private objecToArray( datos: Object ){
    const jugadores : any[] = [];
    if(datos == null) return [];

    Object.keys( datos ).forEach( key =>{
        let jugador: Jugador = datos[key];
        jugador.id=key;
        jugadores.push(jugador);
    })
    return jugadores;
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
