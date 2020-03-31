export class Jugador {

    email: string;
    sexo: string;
    cuit: string;
    clave: string;

    constructor ( email: string, sexo: string, cuit: string, clave: string){
        this.clave = clave;
        this.email = email;
        this.sexo = sexo;
        this.cuit = cuit;
    }

}
