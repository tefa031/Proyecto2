
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import baseUrl from 'src/app/helper';


@Injectable({
  providedIn: 'root'
})
export class UsuarioServices {

  constructor(private http: HttpClient) { }

  public registrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/usuario/`, usuario);
  }

  getValidacion(correo: string, password: string): Observable<any> {
    return of(null);
  }

  getValidarCorreo(correo: string): Observable<boolean> {
    return this.http.get<boolean>(`${baseUrl}/usuario/validarcorreo/${correo}`);
  }
  

}