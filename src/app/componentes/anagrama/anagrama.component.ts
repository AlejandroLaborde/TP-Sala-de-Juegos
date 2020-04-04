import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  juego: JuegoAnagrama;
  nuevoJuego = true;
  constructor() { 
    this.juego=new JuegoAnagrama(3);
    
  }

  ngOnInit() {
  }

  nuevaPalabra(){
    this.juego = new JuegoAnagrama(3);
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
      this.resetearValores();
    }else {
      if ( this.juego.intentos === 0 ) {
        Swal.fire({
          icon: 'error',
          iconHtml: '<i class="fa fa-thumbs-down"></i>',
          title: 'Oops!! has fallado!',
          text: 'No te desanimes! Seguí intentando!'
        });
        this.resetearValores();
      }
    }
    this.juego.palabraIngresada="";
  }
}


