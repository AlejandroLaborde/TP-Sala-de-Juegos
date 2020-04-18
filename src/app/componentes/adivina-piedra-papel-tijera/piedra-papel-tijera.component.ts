import { Component, OnInit } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';
import Swal from 'sweetalert2';
import { JugadoresService } from '../../servicios/jugadores.service';


@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  seleccionadoPiedra = false;
  seleccionadoPapel = false;
  seleccionadoTijera = false;
  juego:JuegoPiedraPapelTijera;
  nuevoJuego=true;

  seleccionadoTijeraPC;
  seleccionadoPapelPC;
  seleccionadoPiedraPC;

  constructor(private jugadorServices: JugadoresService) { }

  ngOnInit(): void {
    
    this.visibilidadesDefault();
  }


  comenzar(){
    this.visibilidadesDefault();
    this.juego= new JuegoPiedraPapelTijera(this.jugadorServices.getUsuarioActual(),this.jugadorServices.getIdActual());
    this.nuevoJuego=false;
  }

  eleccion( opcion: string ){

    this.cambiaVisibilidadImagenesUsuario(opcion);
    this.cambiaVisibilidadImagenesPC(this.juego.eleccionPC);
    this.juego.eleccionJugador = opcion;

    if(this.juego.verificar()==null){
      Swal.fire({
        position: 'bottom',
        icon:'warning',
        iconHtml:'<i class="fa fa-thumbs-up"></i>',
        title: 'Empate!! Vuelve a jugar!',

      }).then(()=>{this.nuevoJuego=true})
    }else{
      if(this.juego.verificar()){
        Swal.fire({
          position: 'bottom',
          icon:'success',
          iconHtml:'<i class="fa fa-thumbs-up"></i>',
          title: 'Felicidades, ha gandado!'
        }).then(()=>{this.nuevoJuego=true})
      }else{
        Swal.fire({
          position: 'bottom',
          icon: "error",
          iconHtml:'<i class="fa fa-thumbs-down"></i>',
          title: 'Oops!! has fallado!',
          text: "No te desanimes! Seguí intentando!"
        }).then(()=>{this.nuevoJuego=true})
      }
      this.jugadorServices.updateJugador(this.juego.idJugador,this.juego.gano);

    }
  

  }

  cambiaVisibilidadImagenesUsuario( opcionElegida ){
    
    if( opcionElegida === 'piedra' ){
      this.seleccionadoTijera = true;
      this.seleccionadoPapel = true;
    }else if( opcionElegida === 'papel' ){
      this.seleccionadoPiedra = true;
      this.seleccionadoTijera = true;
    }else{
      this.seleccionadoPapel = true;
      this.seleccionadoPiedra = true;
    }
  }

  cambiaVisibilidadImagenesPC( opcionElegida ){
    
    if( opcionElegida === 'piedra' ){
      this.seleccionadoTijeraPC = true;
      this.seleccionadoPapelPC = true;
    }else if( opcionElegida === 'papel' ){
      this.seleccionadoPiedraPC = true;
      this.seleccionadoTijeraPC = true;
    }else{
      this.seleccionadoPapelPC = true;
      this.seleccionadoPiedraPC = true;
    }
  }

  

  visibilidadesDefault(){
    this.seleccionadoPapel = false;
    this.seleccionadoPiedra = false;
    this.seleccionadoTijera = false;
    this.seleccionadoPapelPC = false;
    this.seleccionadoPiedraPC = false;
    this.seleccionadoTijeraPC = false;
  }
}
