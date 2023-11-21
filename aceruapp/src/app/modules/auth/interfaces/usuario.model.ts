
export interface UsuarioRegistro {
    id:              number;
    nombre:          string;
    apellidos:       string;
    correo:          string;
    contrasena:      string;
}

export interface UsuarioLogin {
    correo:          string;
    contrasena:      string;
}