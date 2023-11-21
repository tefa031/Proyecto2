
export class Categoria {

    id?: number;
    nombre?: string;
    estado?: string;
    descripcion?: string;
    imagen?: null;

    constructor(nombre: string, descripcion: string, imagen: null, estado: string) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.estado = estado;
    }

}
