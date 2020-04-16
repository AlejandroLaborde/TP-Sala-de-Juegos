import { Component, OnInit } from '@angular/core';
import { Tateti } from '../../clases/juego-tateti';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agilidad-tateti',
  templateUrl: './agilidad-tateti.component.html',
  styleUrls: ['./agilidad-tateti.component.css']
})
export class AgilidadTatetiComponent implements OnInit {

  random;
  visibilidadComenzar = true;
  nuevoJuego : Tateti;
  movimientos;
  botonesEleccion : boolean;
  botonesJuego : boolean;
  terminoJuego : boolean;
  band : boolean;
  nombreJugador : string;

  constructor() {
    
  }

  ngOnInit() {
    
  }

  eleccionSigno( signo ) {
    this.botonesEleccion = false;
    this.botonesJuego = true;
    if (signo == "X") {
      this.nuevoJuego.opcionUsuario = "x";
      this.nuevoJuego.opcionPC = "o";
    }
    else {
      this.nuevoJuego.opcionUsuario = "o";
      this.nuevoJuego.opcionPC = "x";
    }
  }

  modificar(id) {
    if (this.nuevoJuego.lugares[id] == '-') {
      this.nuevoJuego.lugares[id] = this.nuevoJuego.opcionUsuario;
      console.log("assets/imagenes/" + this.nuevoJuego.opcionUsuario + ".png");
      document.images['celda' + id].src = "assets/imagenes/" + this.nuevoJuego.opcionUsuario + ".png";
      document.images['celda' + id].alt = this.nuevoJuego.opcionUsuario;
      this.maquinamov();
    }
  }
  

  maquinamov()
  {
    this.nuevoJuego.resultado = this.nuevoJuego.signo(this.nuevoJuego.opcionUsuario, "jugador");
    console.log(this.nuevoJuego.resultado);
    if (this.nuevoJuego.resultado == "Gano" || this.nuevoJuego.resultado == "Perdio" || this.nuevoJuego.resultado == "Empate")
    { 
      this.band = true;
        
      if(this.nuevoJuego.verificar()==null){
        Swal.fire({
          icon:'warning',
          iconHtml:'<i class="fa fa-thumbs-up"></i>',
          title: 'Empate!! Vuelve a jugar!',
  
        }).then(()=>{this.visibilidadComenzar=true})
      }else{
        if(this.nuevoJuego.verificar()){
          Swal.fire({
            icon:'success',
            iconHtml:'<i class="fa fa-thumbs-up"></i>',
            title: 'Felicidades, ha gandado!'
          }).then(()=>{this.visibilidadComenzar=true})
        }else{
          Swal.fire({
            icon: "error",
            iconHtml:'<i class="fa fa-thumbs-down"></i>',
            title: 'Oops!! has fallado!',
            text: "No te desanimes! Seguí intentando!"
          }).then(()=>{this.visibilidadComenzar=true})
        }
      }
    }
    else
      this.jugar();
  }
    
  jugar() 
  {
    this.random = Math.floor(Math.random() * 8);
    if (this.nuevoJuego.lugares[this.random] == "-") {
      this.nuevoJuego.lugares[this.random] = this.nuevoJuego.opcionPC;
      document.images['celda' + this.random].src = "assets/imagenes/" + this.nuevoJuego.opcionPC + ".png";
      document.images['celda' + this.random].alt = this.nuevoJuego.opcionPC;

      this.nuevoJuego.resultado = this.nuevoJuego.signo(this.nuevoJuego.opcionPC, "maquina");


      if (this.nuevoJuego.resultado == "Gano" || this.nuevoJuego.resultado == "Perdio" || this.nuevoJuego.resultado == "Empate")
      {
    
          this.band = true;
         
          if(this.nuevoJuego.verificar()==null){
            Swal.fire({
              icon:'warning',
              iconHtml:'<i class="fa fa-thumbs-up"></i>',
              title: 'Empate!! Vuelve a jugar!',
      
            }).then(()=>{this.visibilidadComenzar=true})
          }else{
            if(this.nuevoJuego.verificar()){
              Swal.fire({
                icon:'success',
                iconHtml:'<i class="fa fa-thumbs-up"></i>',
                title: 'Felicidades, ha gandado!'
              }).then(()=>{this.visibilidadComenzar=true})
            }else{
              Swal.fire({
                icon: "error",
                iconHtml:'<i class="fa fa-thumbs-down"></i>',
                title: 'Oops!! has fallado!',
                text: "No te desanimes! Seguí intentando!"
              }).then(()=>{this.visibilidadComenzar=true})
            }
          }
      } 
       
    }
    else {
      this.jugar();
    }
  }

  comenzar()
  {
    this.nuevoJuego = new Tateti('asd');
    this.visibilidadComenzar = false;
    this.band=false;
    this.terminoJuego = false;
    this.botonesJuego = false;
    this.botonesEleccion = true;
    this.movimientos=0;

  }
 
}
