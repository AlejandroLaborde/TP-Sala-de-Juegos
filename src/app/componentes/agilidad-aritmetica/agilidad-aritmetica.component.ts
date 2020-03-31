import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  gano:boolean;
  private subscription: Subscription;

  ngOnInit() {
    
  }

   constructor() {
   
    this.ocultarVerificar=true;
    this.Tiempo=5; 
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");  
  }

  NuevoJuego() {

      this.nuevoJuego = new JuegoAgilidad();
      console.log(this.nuevoJuego);
      this.ocultarVerificar=false;
      this.repetidor = setInterval(()=>{ 
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=5;
      }
      }, 900);

  }

  verificar()
  {

    console.log(this.nuevoJuego.verificarSiGano());
    this.ocultarVerificar=false;
    clearInterval(this.repetidor);
  }  

}
