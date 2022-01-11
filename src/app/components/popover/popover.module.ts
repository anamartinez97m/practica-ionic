import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { PopoverComponent } from "./popover.component";

@NgModule({
  imports: [
    // CommonModule,
    BrowserModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [PopoverComponent]
})
  
export class PopoverModule {}
  