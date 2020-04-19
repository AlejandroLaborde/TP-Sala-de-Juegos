import { Component, OnInit } from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  constructor( private juegoService:JuegoServiceService ) {  }

  ngOnInit() {

    this.juegoService.getJuegos().subscribe((asd)=>{
      console.log(asd);
    });

  }

 

}
