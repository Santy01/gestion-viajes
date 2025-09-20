import { Routes } from '@angular/router';
import { DestinosListComponent } from './features/destinos/components/destinos-list.component';
import { DestinoFormComponent } from './features/destinos/components/destino-form.component';
import { TuristasListComponent } from './features/turistas/components/turistas-list.component';
import { TuristaFormComponent } from './features/turistas/components/turista-form.component';
import { ReservasListComponent } from './features/reservas/components/reservas-list.component';
import { ReservaFormComponent } from './features/reservas/components/reserva-form.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'destinos', pathMatch: 'full' },
	{ path: 'destinos', component: DestinosListComponent },
	{ path: 'destinos/nuevo', component: DestinoFormComponent },
	{ path: 'destinos/:id/editar', component: DestinoFormComponent },

	{ path: 'turistas', component: TuristasListComponent },
	{ path: 'turistas/nuevo', component: TuristaFormComponent },
	{ path: 'turistas/:id/editar', component: TuristaFormComponent },

	{ path: 'reservas', component: ReservasListComponent },
	{ path: 'reservas/nuevo', component: ReservaFormComponent },
	{ path: 'reservas/:id/editar', component: ReservaFormComponent },

	{ path: '**', redirectTo: 'destinos' }
];
