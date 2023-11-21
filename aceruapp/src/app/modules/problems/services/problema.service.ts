import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import baseUrl from 'src/app/helper';
import { Problema } from '../model/problema';

@Injectable({
  providedIn: 'root'
})
export class ProblemaService {

  constructor(private http: HttpClient) { }

  getListarProblema(idCategoria: number, estado: string):Observable<Problema[]>{
    return this.http.get<Problema[]>(`${baseUrl}/problema/listar/${idCategoria}/${estado}`);
  }

  guardarProblema(problema: Problema, idCategory: number): Observable<Problema> {
    const problemaConCategoria = {
      ...problema,
      categoria: {
        id: idCategory
      }
    };
    return this.http.post(`${baseUrl}/problema/guardar`, problemaConCategoria);
  }
  
  cambiarEstadoProblema(problemaId: number, estado: string): Observable<void> {
    const url = `${baseUrl}/problema/cambiarEstado/${problemaId}/${estado}`;
    return this.http.put<void>(url, null); 
  }

  insertProblema(nombreusuario: string, problemaId: number): Observable<void> {
    const url = `${baseUrl}/usuario/insertProblema/${nombreusuario}/${problemaId}`;
    return this.http.get<void>(url);
  }

  existsByUsuarioIdAndProblemaId(nombreusuario: string, problemaId: number): Observable<boolean> {
    return this.http.get<boolean>(`${baseUrl}/usuario/exists/${nombreusuario}/${problemaId}`);
  }

}
