import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import baseUrl from 'src/app/helper';
import { Material } from '../model/model';


@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }



  // guardarProblema(problema: Problema, idCategory: number): Observable<Problema> {
  //   const problemaConCategoria = {
  //     ...problema,
  //     categoria: {
  //       id: idCategory
  //     }
  //   };
  //   return this.http.post(`${baseUrl}/problema/guardar`, problemaConCategoria);
  // }
  
  cambiarEstadoProblema(problemaId: number, estado: string): Observable<void> {
    const url = `${baseUrl}/problema/cambiarEstado/${problemaId}/${estado}`;
    return this.http.put<void>(url, null); 
  }


  getListarMaterial(idCategoria: number):Observable<Material[]>{
    return this.http.get<Material[]>(`${baseUrl}/material/porcategory/${idCategoria}`);
  }

  getMaterialById(id: number): Observable<Material> {
    return this.http.get<Material>(`${baseUrl}/material/${id}`);
  }

  createMaterial(material: any): Observable<any> {
    return this.http.post(`${baseUrl}/material`, material);
  }

  eliminarMaterial(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/material/${id}`);
  }
}
