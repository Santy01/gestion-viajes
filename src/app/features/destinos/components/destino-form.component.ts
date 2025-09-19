import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { DestinosService } from '../../../core/services/destinos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-destino-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './destino-form.component.html',
  styleUrls: ['./destino-form.component.css']
})
export class DestinoFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(DestinosService);

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    pais: ['', Validators.required],
    descripcion: ['', Validators.required],
    costo: [0, [Validators.required, Validators.min(0.01)]]
  });

  isEdit = false;
  id?: number;

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;
      this.service.getById(this.id).subscribe({
        next: d => this.form.patchValue({
          nombre: d.nombre,
          pais: d.pais,
          descripcion: d.descripcion,
          costo: d.costo
        })
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const payload = this.form.getRawValue();
    const req = this.isEdit && this.id
      ? this.service.update(this.id, payload)
      : this.service.create(payload);

    req.subscribe({
      next: () => {
        Swal.fire('Éxito', `Destino ${this.isEdit ? 'actualizado' : 'creado'} correctamente`, 'success');
        this.router.navigate(['/destinos']);
      },
      error: (err) => {
        const msg = err?.error?.errors ? Object.values(err.error.errors).flat().join('\n') : 'Revisa los datos.';
        Swal.fire('Error', msg, 'error');
      }
    });
  }
}
