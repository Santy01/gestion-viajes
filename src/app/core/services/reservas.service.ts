import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva, ReservaCreateDto, ReservaUpdateDto } from '../models/reserva.model';

@Injectable({ providedIn: 'root' })
export class ReservasService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/Reservas';

  getAll(): Observable<Reserva[]> { return this.http.get<Reserva[]>(this.baseUrl); }
  getById(id: number): Observable<Reserva> { return this.http.get<Reserva>(`${this.baseUrl}/${id}`); }
  getByTurista(turistaId: number): Observable<Reserva[]> { return this.http.get<Reserva[]>(`${this.baseUrl}/turista/${turistaId}`); }
  getByDestino(destinoId: number): Observable<Reserva[]> { return this.http.get<Reserva[]>(`${this.baseUrl}/destino/${destinoId}`); }
  getByRangoFechas(desde: string, hasta: string): Observable<Reserva[]> { return this.http.get<Reserva[]>(`${this.baseUrl}/rango-fechas`, { params: { desde, hasta } }); }
  create(payload: ReservaCreateDto): Observable<Reserva> { return this.http.post<Reserva>(this.baseUrl, payload); }
  update(id: number, payload: ReservaUpdateDto): Observable<Reserva> { return this.http.put<Reserva>(`${this.baseUrl}/${id}`, payload); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/${id}`); }
  exists(id: number) { return this.http.head(`${this.baseUrl}/${id}`, { observe: 'response' }); }
}
