import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DestinosService } from '../../../core/services/destinos.service';
import { Destino } from '../../../core/models/destino.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-destinos-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './destinos-list.component.html',
  styleUrls: ['./destinos-list.component.css']
})
export class DestinosListComponent {
  private readonly service = inject(DestinosService);
  destinos: Destino[] = [];
  searchTerm = '';
  minCost?: number;
  maxCost?: number;

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({ next: data => this.destinos = data });
  }

  onSearch() {
    if (this.searchTerm) {
      this.service.search(this.searchTerm).subscribe({ next: data => this.destinos = data });
      return;
    }
    if (this.minCost != null || this.maxCost != null) {
      this.service.filterByCosto(this.minCost, this.maxCost).subscribe({ next: data => this.destinos = data });
      return;
    }
    this.load();
  }

  onDelete(d: Destino) {
    Swal.fire({
      title: '¿Eliminar destino?',
      text: `${d.nombre} (${d.pais})`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
  }).then((res: any) => {
      if (res.isConfirmed && d.destinoId) {
        this.service.delete(d.destinoId).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Destino eliminado correctamente', 'success');
            this.load();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar', 'error')
        });
      }
    });
  }
}
