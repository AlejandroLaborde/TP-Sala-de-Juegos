import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import Swal from 'sweetalert2';
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
        this.verificarResultado();
        this.ocultarVerificar = true;
        this.Tiempo=5;
      }
      }, 900);

  }

  verificarResultado()
  {

    if(this.nuevoJuego.verificar()){
      Swal.fire({
        icon:'success',
        iconHtml:'<i class="fa fa-thumbs-up"></i>',
        title: 'Felicidades, ha gandado!'
      })
    }else{
      Swal.fire({
        icon: "error",
        iconHtml:'<i class="fa fa-thumbs-down"></i>',
        title: 'Oops!! has fallado!',
        text: "No te desanimes! Seguí intentando!"
        
      })
    }

    this.ocultarVerificar=false;
    clearInterval(this.repetidor);
  }  

}
