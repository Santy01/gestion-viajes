import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReservasService } from '../../../core/services/reservas.service';
import { Reserva } from '../../../core/models/reserva.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './reservas-list.component.html',
  styleUrls: ['./reservas-list.component.css']
})
export class ReservasListComponent {
  private readonly service = inject(ReservasService);
  reservas: Reserva[] = [];

  // Filtros
  turistaId?: number;
  destinoId?: number;
  desde?: string;
  hasta?: string;

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({ next: data => this.reservas = data });
  }

  onFilter() {
    if (this.turistaId) {
      this.service.getByTurista(this.turistaId).subscribe({ next: d => this.reservas = d });
      return;
    }
    if (this.destinoId) {
      this.service.getByDestino(this.destinoId).subscribe({ next: d => this.reservas = d });
      return;
    }
    if (this.desde && this.hasta) {
      this.service.getByRangoFechas(this.desde, this.hasta).subscribe({
        next: d => this.reservas = d,
        error: err => Swal.fire('Error', err?.error ?? 'Rango inválido', 'error')
      });
      return;
    }
    this.load();
  }

  onDelete(r: Reserva) {
    Swal.fire({
      title: '¿Eliminar reserva?',
      text: `ID ${r.reservaId} - Turista ${r.turistaId} / Destino ${r.destinoId}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((res: any) => {
      if (res.isConfirmed && r.reservaId) {
        this.service.delete(r.reservaId).subscribe({
          next: () => { Swal.fire('Eliminada', 'Reserva eliminada correctamente', 'success'); this.load(); },
          error: () => Swal.fire('Error', 'No se pudo eliminar', 'error')
        });
      }
    });
  }
}
