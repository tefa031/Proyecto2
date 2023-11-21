import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/helper';
import { Usuario } from '../../auth/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getListarUsuarioParticipantes():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${baseUrl}/usuario/list`);
  }

  actualizarRangoUsuario(id: number, nuevoRango: string) {
    return this.http.get(`${baseUrl}/usuario/cambiarRango/${id}/${nuevoRango}`);
  }

}
