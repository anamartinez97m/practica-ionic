import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTravelPage } from './add-travel.page';

const routes: Routes = [
  {
    path: '',
    component: AddTravelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTravelPageRoutingModule {}
