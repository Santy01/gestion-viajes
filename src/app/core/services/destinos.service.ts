import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destino } from '../models/destino.model';

@Injectable({ providedIn: 'root' })
export class DestinosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/destinos';

  getAll(): Observable<Destino[]> { return this.http.get<Destino[]>(this.baseUrl); }
  getById(id: number): Observable<Destino> { return this.http.get<Destino>(`${this.baseUrl}/${id}`); }
  getByPais(pais: string): Observable<Destino[]> { return this.http.get<Destino[]>(`${this.baseUrl}/pais/${encodeURIComponent(pais)}`); }
  filterByCosto(minCost?: number, maxCost?: number): Observable<Destino[]> {
    const params: string[] = [];
    if (minCost != null) params.push(`minCost=${minCost}`);
    if (maxCost != null) params.push(`maxCost=${maxCost}`);
    const qs = params.length ? `?${params.join('&')}` : '';
    return this.http.get<Destino[]>(`${this.baseUrl}/costo${qs}`);
  }
  search(searchTerm: string): Observable<Destino[]> { return this.http.get<Destino[]>(`${this.baseUrl}/search`, { params: { searchTerm } }); }
  create(payload: Omit<Destino, 'destinoId' | 'fechaCreacion' | 'fechaActualizacion'>): Observable<Destino> { return this.http.post<Destino>(this.baseUrl, payload); }
  update(id: number, payload: Omit<Destino, 'destinoId' | 'fechaCreacion' | 'fechaActualizacion'>): Observable<Destino> { return this.http.put<Destino>(`${this.baseUrl}/${id}`, payload); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/${id}`); }
  exists(id: number): Observable<any> { return this.http.head(`${this.baseUrl}/${id}`, { observe: 'response' }); }
}
