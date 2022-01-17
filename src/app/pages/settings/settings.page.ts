import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { DomController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public langs: string[];
  public languages: {element: string, languageKeyName: string}[] = [];
  public isNightModeEnabled: boolean = false;

  constructor(
    private popoverController: PopoverController,
    private translateService: TranslateService,
    private domCtrl: DomController,
    private storageService: StorageService,
    @Inject(DOCUMENT) private document
  ) { } 

  ngOnInit() {
    const toggle = this.document.getElementById('nightModeToggle');

    this.langs = this.translateService.getLangs();

    for(let element of this.langs) {
      const languageKeyName = element + '.language';
      this.languages.push({element, languageKeyName})
    }

    this.storageService.get('nightMode')
    .then(value => {
      const checkedValue = value;
      toggle.setAttribute("checked", checkedValue);
      this.isNightModeEnabled = value;
    });

  }

  async presentPopover(event: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: event,
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
    this.storageService.set('lang', selectedLanguage);
    //translateService.use('en')
    // translateService.get('HELLO').subscribe(
    //   value => {
    //     let alertTitle = value;
    //   }
    // )
  }

  async enableNightMode() {
    if (this.isNightModeEnabled) {
      this.changeTheme('default');
    } else {
      this.changeTheme('#3858a1');
    }
    this.isNightModeEnabled = !this.isNightModeEnabled;
    await this.storageService.set('nightMode', this.isNightModeEnabled);
  }

  changeTheme(toColor: string) {
    this.domCtrl.write(() => {
      if(toColor === 'default') {
        this.document.documentElement.setAttribute(
          "style", "header-background:--header-background-default;"
        );
      } else {
        this.document.documentElement.style.setProperty('--header-background-dark', toColor);
      }
    });
  }  

}
