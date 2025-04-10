import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { VehicleListComponent } from './common/shared-component/vehicle-list/vehicle-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dash-board',
    pathMatch: 'full',
  },
  { path: 'dash-board', component: DashBoardComponent },
  { path: 'vehicle-list', component: VehicleListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
