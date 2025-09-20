export interface Reserva {
  reservaId?: number;
  turistaId: number;
  destinoId: number;
  fechaInicio: string;
  fechaFin: string;
  cantidadPersonas: number;
  total?: number;
  fechaCreacion?: string;
  fechaActualizacion?: string | null;
}

export type ReservaCreateDto = Pick<
  Reserva,
  'turistaId' | 'destinoId' | 'fechaInicio' | 'fechaFin' | 'cantidadPersonas'
>;

export interface ReservaUpdateDto {
  fechaInicio: string;
  fechaFin: string;
  cantidadPersonas: number;
}
