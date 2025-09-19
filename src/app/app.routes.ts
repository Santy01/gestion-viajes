import { Routes } from '@angular/router';
import { DestinosListComponent } from './features/destinos/components/destinos-list.component';
import { DestinoFormComponent } from './features/destinos/components/destino-form.component';
import { TuristasListComponent } from './features/turistas/components/turistas-list.component';
import { TuristaFormComponent } from './features/turistas/components/turista-form.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'destinos', pathMatch: 'full' },
	{ path: 'destinos', component: DestinosListComponent },
	{ path: 'destinos/nuevo', component: DestinoFormComponent },
	{ path: 'destinos/:id/editar', component: DestinoFormComponent },

	{ path: 'turistas', component: TuristasListComponent },
	{ path: 'turistas/nuevo', component: TuristaFormComponent },
	{ path: 'turistas/:id/editar', component: TuristaFormComponent },

	{ path: '**', redirectTo: 'destinos' }
];
