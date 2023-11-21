
export class Material {
    id?:           number;
    nombre?:       string;
    descripcion?:  string;
    tipoMaterial?: string;
    url?:          string;
    archivo?:      string;
    material?:     MaterialCategoria;
}

export class MaterialCategoria {
    id?:          number;
    nombre?:      string;
    imagenurl?:   null;
    descripcion?: string;
    imagenid?:    null;
    estado?:      string;
}
