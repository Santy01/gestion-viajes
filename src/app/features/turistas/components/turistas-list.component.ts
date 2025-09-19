import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TuristasService } from '../../../core/services/turistas.service';
import { Turista } from '../../../core/models/turista.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turistas-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './turistas-list.component.html',
  styleUrls: ['./turistas-list.component.css']
})
export class TuristasListComponent {
  private readonly service = inject(TuristasService);
  turistas: Turista[] = [];
  searchTerm = '';

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe({ next: data => this.turistas = data });
  }

  onSearch() {
    if (this.searchTerm) {
      this.service.search(this.searchTerm).subscribe({ next: data => this.turistas = data });
      return;
    }
    this.load();
  }

  onDelete(t: Turista) {
    Swal.fire({
      title: '¿Eliminar turista?',
      text: `${t.nombre} ${t.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((res: any) => {
      if (res.isConfirmed && t.turistaId) {
        this.service.delete(t.turistaId).subscribe({
          next: () => { Swal.fire('Eliminado', 'Turista eliminado correctamente', 'success'); this.load(); },
          error: () => Swal.fire('Error', 'No se pudo eliminar', 'error')
        });
      }
    });
  }
}
