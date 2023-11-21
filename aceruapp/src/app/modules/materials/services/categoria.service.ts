import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import baseUrl from 'src/app/helper';
import { Categoria } from '../../problems/model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  getListarCategoria(estado: string):Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${baseUrl}/materialcategoria/lista/${estado}`);
  }

  guardarCategoria(dato: FormData): Observable<any> {
    return this.http.post(`${baseUrl}/materialcategoria/nuevo`, dato);
  }

  cambiarEstadoCategoria(categoriaId: number, estado: string): Observable<void> {
    const url = `${baseUrl}/materialcategoria/cambiarEstado/${categoriaId}/${estado}`;
    return this.http.get<void>(url);
  }

}
