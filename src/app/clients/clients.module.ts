import { NgModule } from '@angular/core';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ClientDetailGuard } from './client-detail/client-detail.guard';

@NgModule({
  declarations: [ClientListComponent, ClientDetailComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'clients', component: ClientListComponent },
      {
        path: 'clients/:id',
        canActivate: [ClientDetailGuard],
        component: ClientDetailComponent,
      },
    ]),
  ],
})
export class ClientsModule {}
