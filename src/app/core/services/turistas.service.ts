import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turista } from '../models/turista.model';

@Injectable({ providedIn: 'root' })
export class TuristasService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/turistas';

  getAll(): Observable<Turista[]> { return this.http.get<Turista[]>(this.baseUrl); }
  getById(id: number): Observable<Turista> { return this.http.get<Turista>(`${this.baseUrl}/${id}`); }
  getByEmail(email: string): Observable<Turista> { return this.http.get<Turista>(`${this.baseUrl}/email/${encodeURIComponent(email)}`); }
  search(searchTerm: string): Observable<Turista[]> { return this.http.get<Turista[]>(`${this.baseUrl}/search`, { params: { searchTerm } }); }
  create(payload: Omit<Turista, 'turistaId' | 'fechaCreacion' | 'fechaActualizacion'>): Observable<Turista> { return this.http.post<Turista>(this.baseUrl, payload); }
  update(id: number, payload: Omit<Turista, 'turistaId' | 'fechaCreacion' | 'fechaActualizacion'>): Observable<Turista> { return this.http.put<Turista>(`${this.baseUrl}/${id}`, payload); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/${id}`); }
  existsById(id: number): Observable<any> { return this.http.head(`${this.baseUrl}/${id}`, { observe: 'response' }); }
  existsByEmail(email: string): Observable<any> { return this.http.head(`${this.baseUrl}/email/${encodeURIComponent(email)}`, { observe: 'response' }); }
}
