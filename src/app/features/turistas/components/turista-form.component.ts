import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TuristasService } from '../../../core/services/turistas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turista-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './turista-form.component.html',
  styleUrls: ['./turista-form.component.css']
})
export class TuristaFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TuristasService);

  form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required]
  });

  isEdit = false;
  id?: number;

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.id = +idParam;
      this.service.getById(this.id).subscribe({
        next: t => this.form.patchValue({
          nombre: t.nombre,
          apellido: t.apellido,
          email: t.email,
          telefono: t.telefono
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
        Swal.fire('Éxito', `Turista ${this.isEdit ? 'actualizado' : 'creado'} correctamente`, 'success');
        this.router.navigate(['/turistas']);
      },
      error: (err) => {
        const msg = err?.error?.errors ? Object.values(err.error.errors).flat().join('\n') : (err?.status === 409 ? 'Email duplicado.' : 'Revisa los datos.');
        Swal.fire('Error', msg, 'error');
      }
    });
  }
}
