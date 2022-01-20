import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { DomController, Platform, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { StorageService } from 'src/app/services/storage.service';
import { ThemeService } from 'src/app/services/theme.service';

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
    private platform: Platform,
    private location: Location,
    private popoverController: PopoverController,
    private translateService: TranslateService,
    private storage: StorageService,
    private themeService: ThemeService
  ) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.location.back();
    });
  } 

  ngOnInit() {
    const toggle = document.getElementById('nightModeToggle');

    this.langs = this.translateService.getLangs();

    for(let element of this.langs) {
      const languageKeyName = element + '.language';
      this.languages.push({element, languageKeyName})
    }

    this.storage.get('nightMode')
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
    this.storage.set('lang', selectedLanguage);
    //translateService.use('en')
    // translateService.get('HELLO').subscribe(
    //   value => {
    //     let alertTitle = value;
    //   }
    // )
  }

  async enableNightMode() {
    this.themeService.enableNightMode(this.isNightModeEnabled).then((value) => {
      this.isNightModeEnabled = value;
    });
  }

}
