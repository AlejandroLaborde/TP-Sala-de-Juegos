import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JugadoresService } from '../../servicios/jugadores.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private jugadoresService: JugadoresService,
    private router: Router) { }

  ngOnInit() {
  }

  logOut(){
    this.jugadoresService.logOut(); 
   }

  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
          this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
          this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'AdivinaMasListado':
          this.router.navigate(['/Juegos/AdivinaMasListado']);
        break;
      case 'AgilidadaMasListado':
          this.router.navigate(['/Juegos/AgilidadaMasListado']);
        break;
      case 'Anagrama':
        this.router.navigate(['/Juegos/Anagrama']);
      break;
      case 'PPT':
        this.router.navigate(['/Juegos/Piedra_papel_tijera']);
      break;
      case 'Tateti':
        this.router.navigate(['/Juegos/Tateti']);
      break;
      case 'miJuego':
        this.router.navigate(['/Juegos/Dados']);
      break;
      default:
        this.router.navigate(['/Principal']);
      break;
    }
  }

}
