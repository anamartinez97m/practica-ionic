import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTravelPageRoutingModule } from './add-travel-routing.module';

import { AddTravelPage } from './add-travel.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTravelPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddTravelPage]
})
export class AddTravelPageModule {}
