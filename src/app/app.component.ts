import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    translate: TranslateService, 
    private storage: StorageService
  ) {
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'es']);

    let langFromStorage: string;
    this.storage.get('lang').then((value) => {
      langFromStorage = value;

      if (langFromStorage) {
        translate.use(langFromStorage);
      }
    });
  }
}
