import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Jugador } from '../../clases/jugador';
import { JugadoresService } from '../../servicios/jugadores.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formInvalido = false;
  constructor( private router:Router, private miConstructor: FormBuilder, private jugadoresService: JugadoresService, private http: HttpClient) { }

  formRegistro: FormGroup = this.miConstructor.group({
    email: new FormControl('', [ Validators.email]),
    sexo: new FormControl('',[Validators.required,
      Validators.maxLength(1),
      Validators.pattern(new RegExp('m|M|f|F'))
    ]),
    cuit: new FormControl('',[
      Validators.required,
      Validators.pattern(new RegExp('^[0-9]{2}-[0-9]{8}-[0-9]$'))
    ]),
    clave: new FormControl('', [ Validators.required]),
    copyClave: new FormControl('', [Validators.required])
  });

  ngOnInit() {
  }

  onSubmit() {
    const form = this.formRegistro.value;
    if ( form.clave === form.copyClave ) {
      this.registro( new Jugador(form.email , form.sexo , form.cuit, form.clave));
    }else {
      this.formInvalido = true;
    }
  }

  registro( jugador: Jugador ){
    Swal.showLoading();
    this.jugadoresService.altaJugador(jugador).then(data => {
      Swal.fire({
        icon: 'success',
        title: 'Se registro con Exito',
        text: 'Recuerde que su email es su usuario.',
        showConfirmButton: true,
      }).finally(

        () => document.getElementById('id01').style.display = 'none'
      );
    });
    this.router.navigate(['/']);
  }

}
