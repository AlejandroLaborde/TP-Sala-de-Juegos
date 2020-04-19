import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http/mi-http.service'; 
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { JuegResultados } from '../clases/juego-resultados';
import { Juego } from '../clases/juego';

@Injectable()
export class JuegoServiceService {

  constructor(  private httpclient:HttpClient ) {
    

  }

  public postJuego( juego: Juego ){
    return this.httpclient.post(`${environment.firebaseDB}/juegos.json`, juego);
  }

  public getJuegos(){
    return this.httpclient.get(`${environment.firebaseDB}/juegos.json`).pipe(map( datos => this.objecToArray(datos)));
  }

  private objecToArray( datos: Object ){
    const juegos : JuegResultados[] = [];
    if(datos == null) return [];

    Object.keys( datos ).forEach( key =>{
      console.log(key);
          let juego: any = datos[key];
          juegos.push(juego);
        
    })
    return juegos;
  }
}
