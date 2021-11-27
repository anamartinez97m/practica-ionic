import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PopoverComponent } from 'src/app/components/popover/popover.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public langs: any;
  public languages: any[] = [];
  public isNightModeActivated: boolean = false;

  constructor(
    private popoverController: PopoverController,
    private translateService: TranslateService
  ) { } 

  ngOnInit() {
    this.langs = this.translateService.getLangs();

    for(let element of this.langs) {
      const languageKeyName = element+'.language';
      this.languages.push({element, languageKeyName})
    }
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        data: this.languages
      }
    });

    popover.onDidDismiss().then((dataReturned: any) => {
      if (dataReturned && dataReturned !== null) {
        this.changeLanguage(dataReturned.data);
      }
    });

    return await popover.present();
  }

  changeLanguage(selectedLanguage: string) {
    this.translateService.use(selectedLanguage);
  }
}

//translateService.use('en')

/*
translateService.get('HELLO').subscribe(
  value => {
    // value is our translated string
    let alertTitle = value;
  }
)
*/
