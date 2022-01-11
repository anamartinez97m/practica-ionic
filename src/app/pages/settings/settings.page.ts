import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { DomController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public langs: any;
  public languages: any[] = [];
  public isNightModeEnabled: boolean = false;

  constructor(
    private popoverController: PopoverController,
    private translateService: TranslateService,
    private toastController: ToastController,
    private domCtrl: DomController,
    @Inject(DOCUMENT) private document
  ) { } 

  ngOnInit() {
    this.langs = this.translateService.getLangs();

    for(let element of this.langs) {
      const languageKeyName = element + '.language';
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

    //translateService.use('en')

    // translateService.get('HELLO').subscribe(
    //   value => {
    //     let alertTitle = value;
    //   }
    // )
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  enableNightMode() {
    if (this.isNightModeEnabled) {
      this.isNightModeEnabled = !this.isNightModeEnabled;
      this.changeTheme('default');
    } else {
      this.isNightModeEnabled = !this.isNightModeEnabled;
      this.changeTheme('#3858a1');
    }
  }

  changeTheme(toColor: string) {
    this.domCtrl.write(() => {
      if(toColor === 'default') {
        this.document.documentElement.setAttribute(
          "style", "header-background:--header-background-default;"
        );
      } else {
        this.document.documentElement.style.setProperty('--header-background-dark', toColor);
        // this.document.documentElement.style.addClass('dark');
      }
    });
  }  

}
