import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service';
import { TravelsService } from './services/travels.service';
import { WishListService } from './services/wishlist.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: TranslateService, 
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
