import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ReservasService } from '../../../core/services/reservas.service';
import { TuristasService } from '../../../core/services/turistas.service';
import { DestinosService } from '../../../core/services/destinos.service';
import { ReservaCreateDto, ReservaUpdateDto, Reserva } from '../../../core/models/reserva.model';
import Swal from 'sweetalert2';

function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  const inicio = group.get('fechaInicio')?.value as string;
  const fin = group.get('fechaFin')?.value as string;
  if (!inicio || !fin) return null;
  const start = new Date(inicio);
  const end = new Date(fin);
  return end > start ? null : { dateRange: 'La fecha de fin debe ser posterior a la fecha de inicio' };
}

@Component({
  selector: 'app-reserva-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css']
})
export class ReservaFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly reservasService = inject(ReservasService);
  private readonly turistasService = inject(TuristasService);
  private readonly destinosService = inject(DestinosService);

  form = this.fb.nonNullable.group({
    turistaId: [0, [Validators.required, Validators.min(1)]],
    destinoId: [0, [Validators.required, Validators.min(1)]],
    fechas: this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    }, { validators: dateRangeValidator }),
    cantidadPersonas: [1, [Validators.required, Validators.min(1)]]
  });

  isEdit = false;
  id?: number;

  // opcional: listas de referencia rápidas
  turistas: { id: number; nombre: string }[] = [];
  destinos: { id: number; nombre: string }[] = [];

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;
      this.reservasService.getById(this.id).subscribe({
        next: (r: Reserva) => {
          this.form.patchValue({
            turistaId: r.turistaId,
            destinoId: r.destinoId,
            fechas: { fechaInicio: r.fechaInicio, fechaFin: r.fechaFin },
            cantidadPersonas: r.cantidadPersonas
          });
        }
      });
    }

    // cargar referencias simples (opcional)
    this.turistasService.getAll().subscribe({ next: ts => this.turistas = ts.map(t => ({ id: t.turistaId!, nombre: `${t.nombre} ${t.apellido}` })) });
    this.destinosService.getAll().subscribe({ next: ds => this.destinos = ds.map(d => ({ id: d.destinoId!, nombre: `${d.nombre} (${d.pais})` })) });
  }

  get fechaInicioCtrl() { return this.form.get('fechas.fechaInicio'); }
  get fechaFinCtrl() { return this.form.get('fechas.fechaFin'); }

  onSubmit() {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    const payload = {
      turistaId: raw.turistaId,
      destinoId: raw.destinoId,
      fechaInicio: raw.fechas!.fechaInicio!,
      fechaFin: raw.fechas!.fechaFin!,
      cantidadPersonas: raw.cantidadPersonas
    } as ReservaCreateDto | ReservaUpdateDto;

    const req = this.isEdit && this.id
      ? this.reservasService.update(this.id, payload as ReservaUpdateDto)
      : this.reservasService.create(payload as ReservaCreateDto);

    req.subscribe({
      next: () => {
        Swal.fire('Éxito', `Reserva ${this.isEdit ? 'actualizada' : 'creada'} correctamente`, 'success');
        this.router.navigate(['/reservas']);
      },
      error: (err) => {
        let msg = 'Revisa los datos.';
        if (err?.status === 409) msg = err?.error ?? 'Conflicto de reservas.';
        else if (err?.error?.errors) msg = Object.values(err.error.errors).flat().join('\n');
        else if (err?.status === 400 && typeof err?.error === 'string') msg = err.error;
        Swal.fire('Error', msg, 'error');
      }
    });
  }
}
