import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTravelPageRoutingModule } from './add-travel-routing.module';

import { AddTravelPage } from './add-travel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTravelPageRoutingModule
  ],
  declarations: [AddTravelPage]
})
export class AddTravelPageModule {}
