import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';
import baseUrl from 'src/app/helper';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient: HttpClient) {
  }

  public nuevo(dato: FormData): Observable<any> {
    return this.httpClient.post<any>(`${baseUrl}/auth/nuevo` ,dato);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(`${baseUrl}/auth/login`, loginUsuario);
  }

  getValidarCorreo(correo: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${baseUrl}/auth/existEmail/${correo}`);
  }

  actualizarPerfil(usuario: any): Observable<any> {
    return this.httpClient.put(`${baseUrl}/auth/actualizar`, usuario);
  }

}
