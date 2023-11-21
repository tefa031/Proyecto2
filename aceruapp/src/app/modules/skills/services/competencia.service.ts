import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from 'src/app/helper';
import { Competencia } from '../model/competencia';



@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders()
    .set('Accept', 'text/event-stream');
  }

  private headers?: HttpHeaders;

  cambiarEstadoProblema(problemaId: number, estado: string): Observable<void> {
    const url = `${baseUrl}/problema/cambiarEstado/${problemaId}/${estado}`;
    return this.http.put<void>(url, null); 
  }


  listarCompetencias(estado: string): Observable<Competencia[]> {
    return this.http.get<Competencia[]>(`${baseUrl}/competencia/porEstado/${estado}`);
  }

  crearCompetencia(competencia: Competencia): Observable<Competencia> {
    return this.http.post<Competencia>(`${baseUrl}/competencia/crear`, competencia);
  }

  getCompetenciasPorEstadoSSE(estado: string): Observable<any> {
    const url = `${baseUrl}/competencia/porEstado2/${estado}`;
    return new Observable((observer) => {
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        const competencia = JSON.parse(event.data);
        observer.next(competencia);
      };

      eventSource.onerror = (error) => {
        console.error('Error en EventSource:', error);
        observer.error(error);
        eventSource.close();
      };
    });
  }

  buscarCompetenciaPorId(id: number): Observable<Competencia> {
    return this.http.get<Competencia>(`${baseUrl}/competencia/${id}`);
  }

  eliminarCompetencia(id: number): Observable<void> {
    const url = `${baseUrl}/competencia/${id}`;
    return this.http.delete<void>(url);
  }
  
  insertCompetencia(nombreusuario: string, competenciaId: number): Observable<void> {
    const url = `${baseUrl}/usuario/insertCompetencia/${nombreusuario}/${competenciaId}`;
    return this.http.get<void>(url);
  }

}
