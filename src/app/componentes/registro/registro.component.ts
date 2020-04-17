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
    this.terminosYCondiciones();
  }

  onSubmit() {
    const form = this.formRegistro.value;
    if ( form.clave === form.copyClave ) {
      this.registro( new Jugador(form.email , form.sexo , form.cuit, form.clave));
    }else {
      this.formInvalido = true;
    }
  }

  volverInicio(){
    this.router.navigate(['/Principal']);
  }

  registro( jugador: Jugador ){
    Swal.showLoading();
    this.jugadoresService.altaJugador(jugador).then(data => {
      Swal.fire({
        icon: 'success',
        title: 'Se registro con Exito',
        text: 'Recuerde que su email es su usuario.',
        showConfirmButton: true,
      })
    });
    this.router.navigate(['/Login']);
  }


  terminosYCondiciones(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Terminos y condiciones',
      text: "El Gobierno de la República Argentina (en adelante el “Gobierno Nacional”) no es responsable por los daños y perjuicios que puedan surgir, incluyendo, sin límite, daños, pérdidas o gastos directos, indirectos, que surjan en relación con el uso de los Activos Digitales o la imposibilidad de uso, en relación con cualquier falla en el vencimiento, error, omisión, interrupción, defecto, demora en la operación o transmisión, virus de computadora o falla del sistema de línea, aún en el caso de que el Gobierno Nacional o sus representantes fueran informados sobre la posibilidad de dichos daños, pérdidas o gastos.El Gobierno Nacional no controla ni garantiza la ausencia de virus ni de otros elementos en los contenidos que puedan producir alteraciones en su sistema informático (software y hardware) o en los documentos electrónicos y ficheros almacenados en su sistema informático.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Acepto',
      cancelButtonText: 'No Acepto',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.close();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.volverInicio();
      }
    })


  }



}
