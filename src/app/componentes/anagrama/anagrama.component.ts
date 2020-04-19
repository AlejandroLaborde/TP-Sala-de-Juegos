import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import Swal from 'sweetalert2';
import { JugadoresService } from '../../servicios/jugadores.service';
import { JuegoServiceService } from '../../servicios/juego-service.service';


@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  juego: JuegoAnagrama;
  nuevoJuego = true;
  mensajeError=false;

  constructor(private jugadorServices:JugadoresService, private juegoService:JuegoServiceService) { 
    this.juego=new JuegoAnagrama(3,this.jugadorServices.getUsuarioActual(),this.jugadorServices.getIdActual());
    
  }

  ngOnInit() {
  }

  nuevaPalabra(){
    this.juego = new JuegoAnagrama(3,this.jugadorServices.getUsuarioActual(),this.jugadorServices.getIdActual());
    this.nuevoJuego = false;
  }

  resetearValores(){
    this.nuevoJuego = true;
    this.juego.intentos = 3;
  }

  verificar() { 
    if ( this.juego.verificar() ) {
      Swal.fire({
        icon: 'success',
        iconHtml:'<i class="fa fa-thumbs-up"></i>',
        title: 'Felicidades, ha gandado!'
      });
    }else {
      this.visibilidadMensajeError();
      if ( this.juego.intentos === 0 ) {
        Swal.fire({
          icon: 'error',
          iconHtml: '<i class="fa fa-thumbs-down"></i>',
          title: 'Oops!! has fallado!',
          text: 'No te desanimes! Seguí intentando!'
        });
      }
    }
    this.jugadorServices.updateJugador(this.juego.idJugador,this.juego.gano);
    this.juegoService.postJuego(this.juego).subscribe(()=>{});
    this.juego.palabraIngresada="";
    this.resetearValores();

  }

  visibilidadMensajeError(){
    this.mensajeError=true;
    setTimeout(()=>{this.mensajeError=false},1500);    
  }
}


