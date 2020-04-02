import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  intentos = 5;
  juego: JuegoAnagrama;
  constructor() { 
    this.juego=new JuegoAnagrama(3);
    console.log(this.juego.palabraAOrdenar);
  }

  ngOnInit() {
  }

  verificar() {
    if(this.juego.verificar()){
      Swal.fire({
        title:'Ganaste!!'
      })
    }
  }
}
