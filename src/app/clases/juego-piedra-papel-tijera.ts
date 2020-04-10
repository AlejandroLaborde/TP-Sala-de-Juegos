import { Juego } from './juego';

export class JuegoPiedraPapelTijera extends Juego {

    public static opciones = ['piedra','papel','tijera'];

    public eleccionJugador: string;
    public eleccionPC: string;
 
    constructor( jugador: string) {
        super('PPT', false, jugador);
        this.eleccionAleatoreaPC();

    }

    eleccionAleatoreaPC(){
        this.eleccionPC = JuegoPiedraPapelTijera.opciones[Math.floor(Math.random() * JuegoPiedraPapelTijera.opciones.length)]
    }


    public verificar(): boolean {
        console.log( this.eleccionJugador +"-"+ this.eleccionPC );
        if ( this.eleccionJugador === 'piedra' && this.eleccionPC === 'piedra' ) {
            return null;
        }
        if ( this.eleccionJugador === 'papel' && this.eleccionPC === 'papel' ) {
            return null;
        }
        if ( this.eleccionJugador === 'tijera' && this.eleccionPC === 'tijera' ) {
            return null;
        }

        if ( this.eleccionJugador === 'piedra' && this.eleccionPC === 'tijera' ) {
            this.gano=true;
            return true;
        }
        if ( this.eleccionJugador === 'piedra' && this.eleccionPC === 'papel' ) {
            this.gano=false;
            return false;
        }

        if ( this.eleccionJugador === 'papel' && this.eleccionPC === 'tijera' ) {
            this.gano=false;
            return false;
        }
        if ( this.eleccionJugador === 'papel' && this.eleccionPC === 'piedra' ) {
            this.gano=true;
            return true;
        }

        if ( this.eleccionJugador === 'tijera' && this.eleccionPC === 'piedra' ) {
            this.gano=false;
            return false;
        }
        if ( this.eleccionJugador === 'tijera' && this.eleccionPC === 'papel' ) {
            this.gano=true;
            return true;
        }

    }
}
