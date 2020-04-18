export class Jugador {

    id:string;
    email: string;
    sexo: string;
    cuit: string;
    clave: string;
    gano:boolean;

    constructor ( email: string, sexo: string, cuit: string, clave: string,id?:string,gano?:boolean){
        this.clave = clave;
        this.email = email;
        this.sexo = sexo;
        this.cuit = cuit;
        if(id) this.id=id;
        if(gano) this.gano=gano;
    }

}
